import { ApolloError } from '@apollo/client';
import { StatusCodes } from 'http-status-codes';

import {
  BAD_USER_INPUT,
  ERROR_EDIT_CONFLICT,
} from '../constants/apolloErrorCodes';

interface ErrorInfo {
  errorMessage: string;
  statusCode: number;
}

function handleQueryError(error: unknown): ErrorInfo {
  const errorMessage =
    error instanceof Error ? error.message : 'Something went wrong';
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  if (!(error instanceof ApolloError)) {
    return {
      errorMessage,
      statusCode,
    };
  }

  if (error.networkError) {
    return {
      errorMessage,
      statusCode: StatusCodes.SERVICE_UNAVAILABLE,
    };
  }

  const errorCode = error.graphQLErrors[0].extensions['code'];

  if (errorCode === BAD_USER_INPUT) {
    statusCode = StatusCodes.BAD_REQUEST;
  } else if (errorCode === ERROR_EDIT_CONFLICT) {
    statusCode = StatusCodes.CONFLICT;
  }

  return {
    errorMessage,
    statusCode,
  };
}

export default handleQueryError;
