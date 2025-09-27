declare namespace Account {
  interface UserI {
    id: number;
    google_id: string | null;
    fullname: string;
    username: string;
    email: string;
    password?: string;
    phone: string | null;
    avatar: string;
    birthdate: Date | null;
    role_id: number;
    document: string | null;
    enable_2fa: boolean;
    created_at: Date;
    updated_at: Date;
  }

  interface NotificationI {
    id: number;
    user_id: number;
    title: string;
    type: string;
    message: string;
    read_at: Date | null;
    data: any;
    deleted_at: Date | null;
    created_at: Date;
  }
}
