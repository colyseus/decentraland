# Colyseus + Decentraland: Demo

This repository contains a Decentraland Scene that connects to an authoritative Colyseus server.

![](screenshot.png)

The demonstration starts with a single block placed at the center of the scene. Whenever a player jumps on top of a block - a new block is created at a higher position.

---

## Using Colyseus SDK with Decentraland

Install `colyseus.js`:

```
npm install --save colyseus.js
```

Add `colyseus.js` to your `"bundleDependencies"` in your `package.json`:

```json
  "bundleDependencies": [
    "colyseus.js"
  ]
```

To avoid TypeScript compilation errors you'll need to edit `tsconfig.json`, and include a few `///<reference` to your source-code, as you can see in the [scene/src/connection.ts](scene/src/connection.ts) file.

```json
{
  "compilerOptions": {
    // ...
    "noLib": false,
    // ...
  }
}
```

```typescript
///<reference lib="es2015.symbol" />
///<reference lib="es2015.symbol.wellknown" />
///<reference lib="es2015.collection" />
///<reference lib="es2015.iterable" />

import { Client } from "colyseus.js";
```

> The Colyseus SDK requires a few TypeScript libraries that are excluded by default by Decentraland.


---

## Creating a Colyseus server:

```
npm init colyseus-app ./server
```


## Deploying to [Colyseus Arena](https://www.colyseus.io/arena)

```
npm run build
```

Upload the `lib` folder from the Arena control panel.
