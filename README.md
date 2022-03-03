# Colyseus 0.15 and Protocol Buffers (Raw Binary Message Exchange)

Since Colyseus version 0.15, you can exchange raw bytes as messages via `.sendBytes()`.

This is a _monorepo_ demonstrating how to send and receive Protocol Buffers through raw bytes using Colyseus.

- [packages/server](packages/server): The Colyseus Server (0.15), consumes shared package.
- [packages/client](packages/client): The JavaScript client, consumes shared package.
- [packages/shared](packages/shared): The shared package, having `protobufjs` as dependency.

## Running locally

Clone this project, and from the root folder, run:

```
npm install
npm start
```

Now, access [http://localhost:1234/](http://localhost:1234/) from your web browser.