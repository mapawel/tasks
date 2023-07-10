# TAKS
### SIMPLE NODE BACKEND APP IN EXPRESS WITH TYPESCRIPT

## TECHNOLOGIES USED
- Typescript
- OOP
- ESLint and Prettier
- MySQL (with TypeORM)
- Redis
- JWT
- Class Validator
- Jest (app is *for tests ready*)


### KEY FEATURES
- app works with json
- full requests validation (queries, body, params), DTOs on response
- authentication and authorization with Bearer tokens (JWT) - all routes secured by middleware
- log out functionality with token revoking implemented with blacklisting in Redis
- error handling with response to client
- fetching *tasks* with query params allowing pagination, sorting, filtering


#### ROUTES
POST /auth/login
GET /auth/logout
GET /auth/me

GET /tasks<?query>
GET /tasks/:id
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id

### APP START
1. Clone projet
2. ` npm i`
3. You need your local MySQL DB and Redis
4. put your data to` .env` accordont to `.env.example`
5. `npm run ts-start` for start or compile project to /dist and run app.js

FOR DEVELOPMENT:
- tests: `npm run test`
- linting: `npm run lint`
- formatting: `npm run format`
- !!! WARNING, the folder: *DEVELOPMENT-ONLY* should be deleted before production build, user signon should be implemented with hashed passwords and salt, this is only for development purposes

**(There is a Jest implemented, app is ready to prepare tests, there will be added if needed!)**
