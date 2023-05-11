import createError from 'http-errors';

export const successDetails = {
   OK: {
      status: 200,
      message: 'OK',
      success: (data?: any) => !data,
   },
   CREATED: {
      status: 201,
      message: 'Created',
   },
   ACCEPTED: {
      status: 202,
      message: 'Accepted',
   },
   NO_CONTENT: {
      status: 204,
      message: 'No Content',
   },
   CUSTOM_SUCCESS: {
      status: 200,
      code: 'CUSTOM_SUCCESS',
      message: 'Custom success message.',
   },
};

export const errorDetails = {
   INVALID_INPUT: {
      status: 400,
      code: 'INVALID_INPUT',
      message: 'Invalid input received.',
   },
   MISSING_REQUIRED_FIELDS: {
      status: 400,
      code: 'MISSING_REQUIRED_FIELDS',
      message: 'One or more required fields are missing.',
   },
   INVALID_EMAIL: {
      status: 400,
      code: 'INVALID_EMAIL',
      message: 'The provided email is invalid.',
   },
   UNAUTHORIZED_ACCESS: {
      status: 401,
      code: 'UNAUTHORIZED_ACCESS',
      message: 'Access is denied due to invalid credentials.',
   },
   FORBIDDEN_RESOURCE: {
      status: 403,
      code: 'FORBIDDEN_RESOURCE',
      message: 'You do not have permission to access the requested resource.',
   },
   RESOURCE_NOT_FOUND: {
      status: 404,
      code: 'RESOURCE_NOT_FOUND',
      message: 'The requested resource could not be found.',
   },
   GOOGLE_BOOK_ERROR: {
      status: 404,
      code: 'GOOGLE_BOOK_REQUEST_FAILED',
      message: 'The request google api could not be found.',
   },
};

type ErrorTypes = keyof typeof errorDetails;

export const createCustomError = (type: ErrorTypes) => {
   const errorDetail = errorDetails[type];
   if (!errorDetail) {
      return createError(500, 'An unknown error occurred.');
   }

   const error = createError(errorDetail.status, errorDetail.message);
   error.code = errorDetail.code;
   return error;
};

type SuccessTypes = keyof typeof successDetails;

export const createCustomSuccess = (type: SuccessTypes, customMessage: string | null = null) => {
   const successDetail = successDetails[type];
   if (!successDetail) {
      return {
         status: 200,
         code: 'UNKNOWN_SUCCESS',
         message: 'Unknown success.',
      };
   }

   if (customMessage) {
      successDetail.message = customMessage;
   }

   return successDetail;
};
