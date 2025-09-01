"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader, Info, Megaphone, AlertTriangle, CheckCircle, Gift, Star } from "lucide-react";
import { LuBell } from "react-icons/lu";
import { useUser } from "@/hooks/user.hook";
import useNotification from "@/hooks/notifications.hook";
import { Notification } from "@/api/notification.api";

const notificationMeta = {
  offer: {
    icon: Gift,
    color: "#ec4899", 
  },
  alert: {
    icon: AlertTriangle,
    color: "#f59e0b", 
  },
  success: {
    icon: CheckCircle,
    color: "#10b981", 
  },
  info: {
    icon: Info,
    color: "#3b82f6", 
  },
  announcement: {
    icon: Megaphone,
    color: "#8b5cf6", 
  },
  reward: {
    icon: Star,
    color: "#fbbf24", 
  },
};

export default function NotificationComponent() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [deletingNotification, setDeletingNotification] = useState<string | null>(null);
  const { user } = useUser();
  const { notifications, setNotifications } = useNotification();

  const handleReadNotification = async (id: string) => {
    try {
      await Notification.Read(parseInt(id));
      setNotifications(prev => 
        prev.map(notification => 
          notification.id.toString() === id 
            ? { ...notification, read_at: new Date() }
            : notification
        )
      );
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    setDeletingNotification(id);
    try {
      await Notification.Delete(parseInt(id));
      setNotifications(prev => prev.filter(notification => notification.id.toString() !== id));
    } catch (error) {
      console.error("Erro ao deletar notificação:", error);
    } finally {
      setDeletingNotification(null);
    }
  };

  const unreadCount = notifications.filter((notification) => notification.read_at === null).length;

  const canViewNotifications = user?.role_id !== 8;
  const canDeleteNotifications = user?.role_id !== 8;

  if (!canViewNotifications) {
    return null;
  }

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      <button 
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer text-gray-600" 
        onClick={() => setShowNotifications(!showNotifications)} 
        title={`${unreadCount} notificações não lidas`}
      >
        <LuBell 
          size={20} 
          className={`transition-colors ${showNotifications ? "animate-[wiggle_1s_ease-in-out]" : ""}`} 
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand500 rounded-full w-4 h-4 text-xs flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 30 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
            className="absolute -right-8 mt-2 w-full sm:w-[450px] bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Notificações</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-3 max-h-[70vh] overflow-y-scroll">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-2">Nenhuma notificação</p>
              ) : (
                <AnimatePresence>
                  {notifications.map((notification: Account.NotificationI, index: number) => {
                    const meta = notificationMeta[notification.type as keyof typeof notificationMeta] || {
                      icon: Info,
                      color: "#3C9984", // primary-500
                    };
                    const Icon = meta.icon;
                    const formattedDate = notification.created_at 
                      ? formatDate(notification.created_at)
                      : null;

                    return (
                      <motion.div 
                        key={notification.id} 
                        initial={{ opacity: 0, scale: 0.95, y: -10 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: -10 }} 
                        transition={{ duration: 0.2 }}
                      >
                        <div 
                          onClick={() => handleReadNotification(notification.id.toString())} 
                          className="relative p-3 flex rounded-lg hover:bg-primary-50 transition-all duration-200 cursor-pointer whitespace-normal mb-3 border border-gray-100"
                        >
                          <div 
                            style={{ background: meta.color + "15" }} 
                            className="flex items-center gap-2 mb-1 justify-center max-h-10 min-w-10 rounded-full mr-3"
                          >
                            <Icon className="w-5 h-5" style={{ color: meta.color }} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex gap-3 items-center">
                              {notification.read_at === null && (
                                <span className="bg-primary rounded-full w-2 h-2 animate-pulse block" />
                              )}
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            </div>
                            
                            <p 
                              className="text-xs text-gray-600 mt-1" 
                              dangerouslySetInnerHTML={{ __html: notification.message }} 
                            />
                            
                            {deletingNotification === notification.id.toString() ? (
                              <span className="flex items-center gap-2 text-primary text-sm absolute right-2 top-2">
                                <Loader className="w-4 h-4 animate-spin" />
                              </span>
                            ) : (
                              canDeleteNotifications && (
                                <button 
                                  type="button" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNotification(notification.id.toString());
                                  }} 
                                  className="absolute right-2 top-2 hover:text-primary duration-300 text-gray-400"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )
                            )}
                            
                            <p className="text-xs text-gray-400 text-end mt-3 mr-1">
                              {formattedDate}
                            </p>
                          </div>
                        </div>
                        
                        {index !== notifications.length - 1 && (
                          <span className="block w-full bg-gray-100 h-[1px]" />
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
