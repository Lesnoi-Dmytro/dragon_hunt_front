import { User } from "next-auth";

export default interface AuthUser extends User {
  name: string;
  email: string;
  backendToken: string;
}
