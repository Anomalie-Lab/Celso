import { ContextNotification } from "@/contexts/notification.context";
import { useContext } from "react";

const useNotification = () => {
  const context = useContext(ContextNotification);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationsProvider");
  }
  return context;
};
export default useNotification;
