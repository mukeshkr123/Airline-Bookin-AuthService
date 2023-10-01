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
