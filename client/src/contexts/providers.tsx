"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { NotificationsProvider } from "./notification.context";
import { UserProvider } from "./user.context";
import { queryClient } from "@/lib/query.lib";
import useSocket from "@/hooks/socket.hook";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useSocket();
  return <>{children}</>;
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationsProvider>
          <SocketProvider>{children}</SocketProvider>
        </NotificationsProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};