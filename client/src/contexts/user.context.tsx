"use client";
import { Auth } from "@/api/auth.api";
import { Contexts } from "@/entities/contexts";
import React, { createContext, useEffect, useState, ReactNode, useCallback } from "react";

export const ContextUser = createContext<Contexts.UserProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Account.UserI | null>(null);

  const FetchUser = useCallback(async () => {
    const response = await Auth.getMe();
    if (response) setUser(response);
  }, []);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const cookieValue = cookies.find((cookie) => cookie.trim().startsWith(`${process.env.NEXT_PUBLIC_IS_IN_SESSION}=`));
    if (cookieValue?.split("=")[1] === "true") FetchUser();
  }, [FetchUser]);

  const contextValue: Contexts.UserProps = { user, setUser };

  return <ContextUser.Provider value={contextValue}>{children}</ContextUser.Provider>;
};