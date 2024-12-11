export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const isAxiosError = (error: unknown): boolean => {
  return error && typeof error === 'object' && 'isAxiosError' in error;
};