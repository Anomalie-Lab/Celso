export interface LoginApiProps {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  user?: Account.UserI;
  message?: string;
  status: number;
}

export interface ForgotPasswordApiProps {
  email: string;
}

export interface ResetPasswordApiProps {
  email: string;
  password: string;
  token: string;
}

export interface RegisterApiProps {
  email: string;
  username?: string;
  fullname: string;
  password: string;
  phone: string;
  document?: string;
}