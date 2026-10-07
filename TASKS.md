# Tasks

## First: connect the game to the new API

Goal: the game talks to the new API at `http://localhost:3000/api/v1` instead of the old PHP backend.

### What needs to change

- [x] Rewrite `logins.service.ts` to use JSON bodies and the new endpoints
- [x] Store the JWT token after login/register and send it as `Authorization: Bearer <token>` on protected routes
- [x] Update `players.service.ts` to work with the new response format (no more `data['code']` / `data['data']` wrapper)
- [x] Update components that read `Personagens[0]` or Portuguese field names (`Nome`, `Atk`, `Int`, `Vida`, `ID_Player`) to use the new English field names (`name`, `atk`, `intelligence`, `health`, `idPlayer`)
- [x] Remove or update `apiservice.service.ts` (dead code with hardcoded credentials - kept as commented)

### New API contract

| Old endpoint | New endpoint |
|--------------|--------------|
| `POST /login.php` | `POST /api/v1/auth/login` |
| `POST /signup.php` | `POST /api/v1/auth/signup` |
| `GET /get/getRandomChar.php` | `GET /api/v1/characters/random` |
| `POST /createChart.php` | `POST /api/v1/characters` |
| `GET /get/getChar.php?PlayerID=` | `GET /api/v1/characters/:id` |
| `POST /updateChart.php` | `PATCH /api/v1/characters/:id` |

### Request format changes

- **Old:** `FormData` with `username`/`password` on every request
- **New:** JSON body `{ "username": "...", "password": "..." }` on auth, JWT token on protected routes

### Response format changes

- **Old:** `{ "code": 200, "data": { "Nome": "...", "Atk": 60, "Int": 40, "Vida": 250, "ID_Player": "..." } }`
- **New:** `{ "id": "...", "name": "...", "atk": 60, "intelligence": 40, "health": 250, "isMonster": false, "img": "hero.png", "idPlayer": "..." }`

### Definition of done

- [ ] `ng serve` starts without errors
- [ ] Login works and stores the token
- [ ] Creating a character works
- [ ] Listing characters works
- [ ] Updating a character works
- [ ] Random character works
