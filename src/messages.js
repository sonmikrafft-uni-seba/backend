const HTTP_ERROR_TYPE = {
  BAD_REQUEST: 'Bad Request',
  USER_NOT_FOUND: 'User Not Found',
  UNAUTHORIZED: 'Unauthorized',
  USER_EXISTS: 'User exists',
  INTERNAL_SERVER_ERROR: 'Internal server error',
};

const HTTP_ERROR_TYPE_NUMBER = {
  BAD_REQUEST: 400,
  SUCCESS: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

const HTTP_ERROR_RESPONSE = {
  MISSING_PW: 'The request body must contain a password property.',
  MISSING_MAIL: 'The request body must contain a email property.',
  MISSING_FIRSTNAME: 'The request body must contain a firstname property.',
  MISSING_LASTNAME: 'The request body must contain a lastname property.',
  EMPTY_REQ_BODY: 'The request body is empty',
  USER_ALREADY_EXISTS: 'A user with this email already exists.',
  USER_CREDS_WRONG: 'The email or password is wrong.',
  USER_NOT_FOUND: 'A user with this ID could not be found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error.',
};

export { HTTP_ERROR_RESPONSE, HTTP_ERROR_TYPE, HTTP_ERROR_TYPE_NUMBER };
