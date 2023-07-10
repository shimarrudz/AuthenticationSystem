# 🔒 Authentication System

This is a simple authentication system developed in Node.js using the Nest.js framework. It provides basic authentication features such as account creation, login, token generation, and token renewal.

## 🚀 Features

- **Account Creation**: Users can create a new account by providing an email address and a password.
- **Login**: Users can log in using their email address and password.
- **Token Generation**: After successful login, the system generates an authentication token and a refresh token.
- **Token Renewal**: Users can renew the authentication token using the refresh token.
- **Route Protection**: The system protects specific routes, allowing access only to authenticated users.

## 💻 Technologies Used

- Node.js
- Nest.js
- TypeScript
- Prisma
- PostgreSQL
- JWT (JSON Web Tokens)
- Docker

## ⚙️ Prerequisites

- Node.js
- Docker

## 📝 Installation

1. Clone this repository to your local machine:

```
git clone <https://github.com/your-username/authentication-system.git>

```

1. Navigate to the project directory:

```
cd authentication-system

```

1. Install the project dependencies:

```
npm install

```

1. Start a Docker container for the PostgreSQL database:

```
docker run --name authentication-system-db -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=authentication_system -p 5432:5432 -d postgres

```

1. Run the database migrations:

```
npx prisma migrate dev

```

1. Start the development server:

```
npm run start:dev

```

The server will be running at [http://localhost:3000](http://localhost:3000/).

## 🛣️ Routes

### POST /auth/signup

Create a new account.

**Request Parameters:**

- `email`: User's email address.
- `password`: User's password.

**Example Request:**

```
curl -X POST <http://localhost:3000/auth/signup> -d "email=user@example.com" -d "password=password123"

```

### POST /auth/login

Authenticate a user.

**Request Parameters:**

- `email`: User's email address.
- `password`: User's password.

**Example Request:**

```
curl -X POST <http://localhost:3000/auth/login> -d "email=user@example.com" -d "password=password123"

```

### POST /auth/refresh-token

Renew the authentication token.

**Request Parameters:**

- `refreshToken`: User's refresh token.

**Example Request:**

```
curl -X POST <http://localhost:3000/auth/refresh-token> -d "refreshToken=refresh-token-value"

```

Feel free to modify the README according to your specific needs, including adding more details, instructions, or additional sections as required.
