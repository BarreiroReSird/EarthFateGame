# EarthFate

Author: Carlos Barreiro

Browser game made with Angular 11. RPG style: create character, train stats and fight random characters.

Frontend: Angular 11.2.3
Backend: API at localhost:3000/api/v1 (separate repository)

## Setup

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Start development server:

```bash
ng serve
```

Or start both frontend and backend together:

```bash
npm run start:all
```

This runs Angular on `http://localhost:4200` and the API on `http://localhost:3000` in parallel.

Open at `http://localhost:4200/`

## Node.js 17+ OpenSSL Error

Angular 11 uses an old webpack version that does not work with OpenSSL 3. The project `.npmrc` sets:

```
node-options=--openssl-legacy-provider
```

If you still see the error, set it manually:

Windows PowerShell:
```
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

Linux / macOS:
```
export NODE_OPTIONS="--openssl-legacy-provider"
```

## Build

```bash
ng build
```

Production build:

```bash
npm run build -- --prod
```

Output is in the `dist/` folder.

## API URL

Development: `environment.ts` uses `http://localhost:3000/api/v1`

Production: `environment.prod.ts` uses `/api/v1`, assuming frontend and API are served from the same origin behind a reverse proxy.

If the API is on a different domain, set the full URL in `environment.prod.ts` and add the frontend origin to the API's `CORS_ORIGIN`.
