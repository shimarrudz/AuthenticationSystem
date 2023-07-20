### Application Requirements

**Road**
- [X] The system should allow users to register by providing their name, email, and a password.
- [X] The system should allow users to log in using their registered email and password.
- [X] The system should generate an authentication token and a refresh token upon user login.
- [X] The system should allow users to view their profile, including personal information.
- [X] The system should allow users to soft delete their account.
- [X] The system should allow authenticated users to stay logged in without the need to log out.
- [X] Protect All Routes.
- [X] Access token can be valid just for one user
- [X] Apply password validator and e-mail example@gmail.com.
- [X] Review crypto or bcrypt
- [X] Apply Dependencie Inversion.
- [X] Change everything to english.
- [X] Refactor structure code
- [X] Import Path Maping.
- [ ] Block refreshToken access instead of accessToken
- [ ] Fix routes, email validation, password, login more then 1 parameters
- [ ] Apply tests in memory, unit and e2e.
- [ ] Make refresh token exclusive
- [ ] Prettier on everything
- [ ] Refactor code.

**Diferentials**
- [ ] The system should support two-factor authentication via SMS or email for user login.
- [ ] The system should allow users to update their password.
- [ ] Config logger

**Functional Requirements:**
- [X] The system should allow users to register by providing their name, email, and a password.
- [X] The system should allow users to log in using their registered email and password.
- [X] The system should generate an authentication token and a refresh token upon user login.
- [X] The system should allow users to view their profile, including personal information.
- [X] The system should allow users to soft delete their account.

**Business Rules:**

// Only one error is necessary in authentication.

- [X] Each user should have a unique email address to register in the system.
- [X] User passwords should be stored securely using encryption techniques.
- [X] Passwords should follow alphanumeric patterns, with a minimum length of 8 characters and a maximum length of 32 characters.
- [X] The existence of a user's email should be validated.
- [X] During email registration, the email format "example@.com" should be validated.
- [###] Authenticated users should only have access to and be able to update their own profile.
- [X] The system should protect specific routes, such as allowing access only to authenticated users.
- [X] Tokens should expire every 5 minutes.
- [X] The refresh token should be used to renew the authentication token when it expires.
- [X] The system should verify the validity of tokens and ensure data security.
- [X] The login route should generate an authentication token.
- [X] Error treatment status code

**Non-Functional Requirements:**

- [X] The system should be developed using the Nest.js framework and the TypeScript programming language.
- [X] The system should follow the principles of RESTful architecture.
- [X] The system should be secure, protecting users' personal information.
- [X] The system should be testable, facilitating the writing and execution of automated tests to ensure code quality.
- [X] The system should have clear and comprehensive documentation using Swagger, including installation instructions, configuration details, and API usage guidelines.
- [X] The system should integrate with third-party services for email authentication, file storage, etc., when necessary.
- [X] The system should persist user data using PostgreSQL.

Feel free to add more details or adjust the requirements according to your specific needs.