import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const port = Number.parseInt(process.env.SMOKE_PORT ?? '4322', 10);
const baseUrl = `http://127.0.0.1:${port}`;
const entryPath = fileURLToPath(new URL('../dist/server/entry.mjs', import.meta.url));
const cwd = fileURLToPath(new URL('../', import.meta.url));

let serverLogs = '';
let forceKillTimer;

const server = spawn(process.execPath, [entryPath], {
  cwd,
  env: {
    ...process.env,
    HOST: '127.0.0.1',
    PORT: String(port),
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

const captureLogs = (chunk) => {
  serverLogs = `${serverLogs}${chunk.toString()}`.slice(-6000);
};

server.stdout.on('data', captureLogs);
server.stderr.on('data', captureLogs);

const stopServer = async () => {
  if (server.exitCode !== null) {
    return;
  }

  server.kill('SIGTERM');
  forceKillTimer = setTimeout(() => {
    if (server.exitCode === null) {
      server.kill('SIGKILL');
    }
  }, 2000);

  await new Promise((resolve) => {
    server.once('exit', resolve);
  });
};

const fail = (message) => {
  throw new Error(message);
};

const waitForHealth = async () => {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (server.exitCode !== null) {
      fail(`Server exited before becoming healthy.\n\n${serverLogs}`);
    }

    try {
      const response = await fetch(`${baseUrl}/api/health`);

      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until the server is ready.
    }

    await delay(500);
  }

  fail(`Timed out waiting for ${baseUrl}/api/health.\n\n${serverLogs}`);
};

try {
  await waitForHealth();

  const homeResponse = await fetch(`${baseUrl}/`);

  if (!homeResponse.ok) {
    fail(`Expected GET / to return 200, received ${homeResponse.status}.`);
  }

  const homeHtml = await homeResponse.text();

  if (!homeHtml.includes('Pratik Bhattarai') || !homeHtml.includes('main-content')) {
    fail('Home page is missing expected markup after build.');
  }

  const healthResponse = await fetch(`${baseUrl}/api/health`);

  if (!healthResponse.ok) {
    fail(`Expected GET /api/health to return 200, received ${healthResponse.status}.`);
  }

  const healthPayload = await healthResponse.json();

  if (!healthPayload?.ok || healthPayload.status !== 'healthy') {
    fail('Health endpoint returned an unexpected payload.');
  }

  console.log('Smoke test passed.');
} finally {
  clearTimeout(forceKillTimer);
  await stopServer();
}
