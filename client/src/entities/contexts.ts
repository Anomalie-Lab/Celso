/* eslint-disable */
export declare namespace Contexts {
    interface UserProps {
      user: Account.UserI | null;
      setUser: React.Dispatch<React.SetStateAction<Account.UserI | null>>;
    }
    
    interface NotificationProps {
      notifications: Account.NotificationI[] | [];
      setNotifications: React.Dispatch<React.SetStateAction<Account.NotificationI[] | []>>;
    }
  }