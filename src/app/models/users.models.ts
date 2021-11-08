export interface LoginUserMain {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: any;
  codigo: string;
  photo: string;
  verification: number;
  created_at: string;
  updated_at: string;
}

export interface LoginApp {
  access_token: string;
  user: LoginUserMain;
  token_type: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  type: number;
  photo: string;
  plataforma: string;
  token: string;
}
