"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomSuccess = exports.createCustomError = exports.errorDetails = exports.successDetails = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
exports.successDetails = {
    OK: {
        status: 200,
        message: 'OK',
        success: (data) => !data,
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
exports.errorDetails = {
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
const createCustomError = (type) => {
    const errorDetail = exports.errorDetails[type];
    if (!errorDetail) {
        return (0, http_errors_1.default)(500, 'An unknown error occurred.');
    }
    const error = (0, http_errors_1.default)(errorDetail.status, errorDetail.message);
    error.code = errorDetail.code;
    return error;
};
exports.createCustomError = createCustomError;
const createCustomSuccess = (type, customMessage = null) => {
    const successDetail = exports.successDetails[type];
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
exports.createCustomSuccess = createCustomSuccess;
