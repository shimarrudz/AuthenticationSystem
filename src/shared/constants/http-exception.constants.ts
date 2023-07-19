export const HttpExceptionConstants = {
    INVALID_CREDENTIALS: {
      statusCode: 401,
      message: 'Invalid credentials',
    },
    NOT_FOUND: {
      statusCode: 404,
      message: 'Not found',
    },
    TOKEN_NOT_FOUND: {
      statusCode: 404,
      message: 'Token not found',
    },
    INVALID_REFRESH_TOKEN: {
      statusCode: 401,
      message: 'Invalid refresh token',
    },
    USER_ALREADY_EXISTS: {
      statusCode: 409,
      message: 'User already exists',
    },
    FAILED_TO_CREATE_USER: {
      statusCode: 500,
      message: 'Failed to create user',
    },
    USER_NOT_FOUND: {
      statusCode: 404,
      message: 'User not found',
    },
  };
