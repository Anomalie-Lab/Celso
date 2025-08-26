"use client";
import { useContext } from "react";
import { ContextUser } from "@/contexts/user.context";

export const useUser = () => {
    const context = useContext(ContextUser);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };