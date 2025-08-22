import { AxiosResponse } from "axios";

import { ForgotPasswordApiProps, LoginApiProps, LoginApiResponse, ResetPasswordApiProps, RegisterApiProps } from "./api";
import { api } from "@/lib/axios.lib";

const getMe = async () => {
  const response = await api.get<Account.UserI | null>("/auth/me");
  return response.data ?? null;
};

const login = async ({ email, password }: LoginApiProps): Promise<LoginApiResponse> => {
  const response: AxiosResponse = await api.post("/auth/login", { email, password });
  return { user: response.data, status: response.status };
};

const register = async (data: RegisterApiProps): Promise<LoginApiResponse> => {
  const response: AxiosResponse = await api.post("/auth/register", data);
  return { user: response.data, status: response.status };
};

const logout = async (): Promise<number> => {
  const response: AxiosResponse = await api.get("/auth/logout");
  return response.status;
};

const forgotPassword = async ({ email }: ForgotPasswordApiProps): Promise<number> => {
  const response: AxiosResponse = await api.post("/auth/forgot-password", { email });

  return response.status;
};

const resetPassword = async ({ email, password, token }: ResetPasswordApiProps) => {
  const response: AxiosResponse = await api.post("/auth/reset-password", { email, password, token });

  return response.status;
};

export const Auth = { getMe, login, register, forgotPassword, resetPassword, logout };
