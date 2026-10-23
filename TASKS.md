# Tasks

## Connect game to new API

Goal: The game talks to the new API at `http://localhost:3000/api/v1` instead of the old PHP backend.

### Completed

- [x] Rewrite `logins.service.ts` to use JSON bodies and new endpoints
- [x] Store JWT token after login/register and send as Authorization header
- [x] Update `players.service.ts` to work with new response format
- [x] Update components to use English field names instead of Portuguese
- [x] Remove `apiservice.service.ts` (dead code)

### Remaining

- [ ] Test ng serve starts without errors
- [ ] Test login works and stores token
- [ ] Test creating a character
- [ ] Test listing characters
- [ ] Test updating a character
- [ ] Test random character endpoint

### Endpoint mapping

| Old endpoint | New endpoint |
|--------------|--------------|
| POST /login.php | POST /api/v1/auth/login |
| POST /signup.php | POST /api/v1/auth/signup |
| GET /get/getRandomChar.php | GET /api/v1/characters/random |
| POST /createChart.php | POST /api/v1/characters |
| GET /get/getChar.php?PlayerID= | GET /api/v1/characters/:id |
| POST /updateChart.php | PATCH /api/v1/characters/:id |

### Request format

Old: FormData with username/password on every request
New: JSON body on auth, JWT token on protected routes

### Response format

Old: `{ "code": 200, "data": { "Nome": "...", "Atk": 60, "Int": 40, "Vida": 250, "ID_Player": "..." } }`
New: `{ "id": "...", "name": "...", "atk": 60, "intelligence": 40, "health": 250, "isMonster": false, "img": "hero.png", "idPlayer": "..." }`
