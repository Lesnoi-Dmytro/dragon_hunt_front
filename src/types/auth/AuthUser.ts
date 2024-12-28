import { User } from "next-auth";

export interface AuthUser extends User {
  id: string;
  name: string;
  email: string;
  backendToken: string;
}
