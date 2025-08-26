"use client";
import { Contexts } from "@/entities/contexts";
import { useUser } from "@/hooks/user.hook";
import { Notification } from "@/api/notification.api";
import React, { createContext, useEffect, useState, ReactNode, useCallback } from "react";

export const ContextNotification = createContext<Contexts.NotificationProps | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Account.NotificationI[]>([]);
  const { user } = useUser();

  const FetchNotifications = useCallback(async () => {
    const response = await Notification.Get();
    if (response) setNotifications(response.data);
  }, []);

  useEffect(() => {
    if (user?.id) FetchNotifications();
  }, [FetchNotifications, user?.id]);

  const contextValue: Contexts.NotificationProps = { notifications, setNotifications };

  return <ContextNotification.Provider value={contextValue}>{children}</ContextNotification.Provider>;
};
