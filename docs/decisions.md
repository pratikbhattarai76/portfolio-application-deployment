# Design Decisions

## Why Docker?

To ensure consistent runtime and simplify deployment.

## Why GHCR?

To store and distribute container images directly from GitHub.

## Why pull-based deployment?

To avoid exposing the server for inbound deployment triggers and keep the setup simple.

## Why Node.js runtime?

The application uses SSR and server-side features like email handling.
