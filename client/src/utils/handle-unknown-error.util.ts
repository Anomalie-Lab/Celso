export default function handleUnknownError(error: unknown, defaultMessage: string) {
  if (error && typeof error === "object" && "response" in (error as { response?: { data?: { message?: string } } })) {
    return (error as { response: { data: { message?: string } } }).response.data.message || defaultMessage;
  }
  if (error instanceof Error) return error.message || defaultMessage;
  return defaultMessage;
}
