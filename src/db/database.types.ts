export interface UserRow {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  membership_status: "standard" | "member" | "admin";
  created_at: Date;
}

export interface MessageRow {
  id: number;
  title: string;
  text: string;
  author_id: number;
  created_at: Date;
}

export interface ReadReceipt {
  user_id: number;
  message_id: number;
  read_at: Date;
}
