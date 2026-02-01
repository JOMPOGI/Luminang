export interface User {
  username: string;
  role: 'user' | 'admin';
  email?: string;
}

export interface Developer {
  name: string;
  role: string;
  subtitle: string;
  email: string;
  image?: string;
}