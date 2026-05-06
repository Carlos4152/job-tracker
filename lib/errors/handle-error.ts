import { AppError } from '.';

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  console.error(error);

  return {
    success: false,
    message: 'Unexpected error',
  };
}
