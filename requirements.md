### Application Requirements

**Functional Requirements:**

- [ ] The system should allow users to register by providing their name, email, and a password.
- [ ] The system should send an email to the user to validate their registration.
- [ ] The system should allow users to log in using their registered email and password.
- [ ] The system should generate an authentication token and a refresh token upon user login.
- [ ] The system should allow users to view their profile, including personal information.
- [ ] The system should allow users to delete their account.
- [ ] The system should allow authenticated users to stay logged in without the need to log out.
- [ ] The system should support two-factor authentication via SMS or email for user login.
- [ ] The system should allow users to update their password. **// Optional**

**Business Rules:**

// Only one error is necessary in authentication.

- [ ] Each user should have a unique email address to register in the system.
- [ ] User passwords should be stored securely using encryption techniques.
- [ ] Passwords should follow alphanumeric patterns, with a minimum length of 8 characters and a maximum length of 32 characters.
- [ ] The existence of a user's email should be validated.
- [ ] During email registration, the email format "example@.com" should be validated.
- [###] Authenticated users should only have access to and be able to update their own profile.
- [ ] Two-factor authentication should be available via SMS or email.
- [ ] The system should protect specific routes, such as allowing access only to authenticated users.
- [ ] Tokens should expire every 5 minutes.
- [ ] After expiration, a new "refresh token" should be generated.
- [ ] The refresh token should be used to renew the authentication token when it expires.
- [ ] The system should verify the validity of tokens and ensure data security.
- [ ] The login route should generate an authentication token.

**Non-Functional Requirements:**

- [ ] The system should be developed using the Nest.js framework and the TypeScript programming language.
- [ ] The system should follow the principles of RESTful architecture.
- [ ] The system should be secure, protecting users' personal information.
- [ ] The system should be testable, facilitating the writing and execution of automated tests to ensure code quality.
- [ ] The system should have clear and comprehensive documentation using Swagger, including installation instructions, configuration details, and API usage guidelines.
- [ ] The system should integrate with third-party services for email authentication, file storage, etc., when necessary.
- [ ] The system should persist user data using PostgreSQL.

Feel free to add more details or adjust the requirements according to your specific needs.