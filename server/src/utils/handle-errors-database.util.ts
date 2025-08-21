import { HttpException, HttpStatus } from "@nestjs/common";

export const HandleErrorsUserConflict = (error) => {
  if (error?.meta?.target) {
    switch (error.meta.target) {
      case "users_username_key":
        throw new HttpException("Nome de usuário já existe.", HttpStatus.CONFLICT);
      case "users_email_key":
        throw new HttpException("E-mail já existe.", HttpStatus.CONFLICT);
      case "users_national_id_key":
        throw new HttpException("CPF já existe.", HttpStatus.CONFLICT);
      default:
        throw new HttpException("Ocorreu um erro inesperado.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  throw new HttpException(error.message, error.status ?? HttpStatus.BAD_REQUEST);
};

export default function handleUnknownError(error: unknown, defaultMessage: string) {
  try {
    if (error instanceof HttpException) {
      const response = error.getResponse();
      if (typeof response === "object" && "message" in response) {
        throw new HttpException((response as { message: string }).message || defaultMessage, error.getStatus());
      }
    }

    if (error instanceof Error) {
      throw new HttpException(error.message || defaultMessage, HttpStatus.BAD_REQUEST);
    }

    throw new HttpException(defaultMessage, HttpStatus.BAD_REQUEST);
  } catch (error) {
    throw new HttpException(error instanceof HttpException ? error.getResponse() : defaultMessage, error instanceof HttpException ? error.getStatus() : HttpStatus.BAD_REQUEST);
  }
}
