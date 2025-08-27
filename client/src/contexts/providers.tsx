"use client";
import { NotificationsProvider } from "./notification.context";
import { UserProvider } from "./user.context";
import useSocket from "@/hooks/socket.hook";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useSocket();
  return <>{children}</>;
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <NotificationsProvider>
        <SocketProvider>{children}</SocketProvider>
      </NotificationsProvider>
    </UserProvider>
  );
};