# Authentication and Authorization

## Authentication

Authentication is the process of identifying users uniquely and answering the question, "Who is the user?" Various methods can be employed for authentication:

- **Using Mobile**: Utilizing mobile numbers for user identification, often involving OTPs (One-Time Passwords) or login links.
- **OmniAuth**: Implementing OmniAuth for single sign-on (SSO) using third-party providers such as Gmail, Facebook, or GitHub.
- **Token-Based**: Utilizing token-based authentication, specifically JSON Web Tokens (JWT).

## Authorization

Authorization determines user capabilities and answers the question, "What can the user do?"

## Token-Based Authentication (JWT)

Token-based authentication, using JWT, involves the following steps:

1. **User Login**:

   - The client sends the user's email and password to the server.
   - The server checks if the user exists and verifies the provided password.
   - If successful, the server generates a JWT token.
   - The token is sent as a response to the client.

2. **Subsequent Requests**:

   - For each subsequent request, the client includes the JWT token in the request headers.
   - The server verifies the token's authenticity and validity.
   - If the token is valid, the server performs the requested action.

3. **JWT (Json Web Token)**:
   - JWTs are generated using client credentials (username/password).
   - Tokens must have a validity period to enhance security.
   - JWTs can be used to retrieve client credentials if necessary.

## Logout

To log a user out:

- Destroy the token on the client-side.
- Optionally, invalidate the token on the server-side.

# AuthService

1. first setup express server and folder structure
2. then install `npm i mysql2` and `npm i sequelize sequelize-cli`
3. then initialize the `npx sequelize init` -> it will create folders - seeders, models, migrations and config
4. Setup database configuration

```json
{
  "development": {
    "username": "root",
    "password": "Mukeshkr123",
    "database": "AUTH_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

5. create the db `npx sequelize db:create` it will create the database
6. Then sync database `npx sequelize db:migrate`

==> Create user model
run the following command `npx sequelize model:generate --name User --attributes email:string,password:string`
-> `npx sequelize db:migrate`
