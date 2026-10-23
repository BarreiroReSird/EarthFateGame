# EarthFate

Author: Carlos Barreiro

Portfolio project. A simple browser game made with Angular 11 (RPG style: create character, train stats and fight random characters).

Frontend: Angular 11.2.3
Expected backend: API at localhost:3000/api/v1 (separate repository)

## Run the project

Install dependencies:
```
npm install --legacy-peer-deps
```

Start development server:
```
ng serve
```
Open in the browser `http://localhost:4200/`.

## Node.js 17+ | Error ERR_OSSL_EVP_UNSUPPORTED

Angular 11 uses an old webpack version. It does not work with OpenSSL 3, which is the default in Node 17 or newer. The project's `.npmrc` already sets:

```
node-options=--openssl-legacy-provider
```

If you still see this error, set it manually before your command:

Windows PowerShell:
```
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

Linux / macOS:
```
export NODE_OPTIONS="--openssl-legacy-provider"
```

## Build

```
ng build
```

Production build:

```
npm run build -- --prod
```

The final files are stored in the `dist/` folder.

## API URL

- Development: `environment.ts` uses `http://localhost:3000/api/v1`.
- Production: `environment.prod.ts` uses `/api/v1`, assuming the frontend and API are served from the same origin behind a reverse proxy.

If the API is deployed on a different domain, set the full URL in `environment.prod.ts` and add the frontend origin to the API's `CORS_ORIGIN`.

## Notes

This project was created with Angular CLI 11.2.3.
