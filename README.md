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

## Step 1: Setup Express Server and Folder Structure

Create a new Node.js project and set up your folder structure:

```bash
mkdir AuthService
cd AuthService
npm init -y
npm install express
```

Create an `index.js` file to set up your Express server.

## Step 2: Install Sequelize and Sequelize CLI

Install Sequelize and Sequelize CLI for working with MySQL databases:

```bash
npm install sequelize sequelize-cli mysql2
```

## Step 3: Initialize Sequelize

Initialize Sequelize in your project using the following command:

```bash
npx sequelize init
```

This command will generate the following folders: `seeders`, `models`, `migrations`, and `config`.

## Step 4: Setup Database Configuration

Configure your database settings in the `config/config.json` file. Update the development, test, and production configurations with your MySQL credentials.

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

## Step 5: Create the Database

Run the following command to create the database:

```bash
npx sequelize db:create
```

This command will create the database specified in your configuration.

## Step 6: Create User Model

Generate a User model using Sequelize CLI. Run the following command:

```bash
npx sequelize model:generate --name User --attributes email:string,password:string
```

This command will generate a User model in the `models` folder with email and password attributes.

Now, apply the migration to create the User table:

```bash
npx sequelize db:migrate
```

Your User model and database table are now set up and ready to use for authentication.

---

## Hashing the Password Using bcrypt

To hash the password before creating a new user, you can use the `bcrypt` library. First, install `bcrypt`:

```bash
npm install bcrypt
```

Then, use the `beforeCreate` hook in your User model to hash the password:

```javascript
// Hash the password before creating a new user
User.beforeCreate(async (user) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  } catch (error) {
    throw new Error("Error hashing the password");
  }
});
```

2. verify the password

```javascript
 checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
```

This code will hash the user's password before it is saved to the database, enhancing security.

---

## Create JSON web token

**Install json web token** - `npm install jsonwebtoken`

1. Create a new web token

```javascript
createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

```

2. Verify a jsw token

```javascript
verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
      console.log();
    } catch (error) {
      console.log("Something went wrong in token validation");
      throw error;
    }
  }
```

## Create a Role Model

**create the command** `npx sequelize model:genrate --name Role --attributes  name:string `

then ` npx sequelize db:migrate`

create seeders for user roles
`npx sequelize seed:generate --name add-roles`

insert bulk insert
` npx sequelize db:seed --seed 20231004081405-add-roles.js`
