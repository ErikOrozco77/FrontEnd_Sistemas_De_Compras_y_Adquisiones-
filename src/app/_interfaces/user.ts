export interface User {
  id: number  | null;
  parent_id: number | null;
  role_id: number;
  username: string;
  password: string;
  email: string;
  banned: number;
  ban_reason: string | null;
  newpass: string;
  newpass_key: string;
  newpass_time: Date | null;
  last_ip: string;
  last_login: Date | null;
  created: Date;
  modified: Date | null;
}
