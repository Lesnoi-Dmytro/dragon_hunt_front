import { JWT } from "next-auth/jwt";

export default interface CustomJwt extends JWT {
  email: string;
  name: string;
  backend_token: string;
}
