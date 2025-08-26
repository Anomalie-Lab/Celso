"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
import useNotification from "./notifications.hook";
import { useUser } from "./user.hook";

const useSocket = () => {
  const { user } = useUser();
  const { setNotifications } = useNotification();

  useEffect(() => {
    if (user?.id) {
      const socket = io(process.env.NEXT_PUBLIC_API_URL, { query: { user_id: user?.id } });
      socket.on("notification", (data) => {
        setNotifications((prev: Account.NotificationI[]) => [data, ...prev]);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [user?.id]);

  return null;
};

export default useSocket;
