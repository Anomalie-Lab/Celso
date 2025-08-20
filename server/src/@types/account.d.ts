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
    birthdate: string | null;
    role_id: number;
    document: string | null;
    enable_2fa: boolean;
    created_at: Date;
    updated_at: Date;
  }
}
