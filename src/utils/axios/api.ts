import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import AuthUser from "@/types/auth/AuthUser";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiServer.interceptors.request.use(async (config) => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as AuthUser;
    if (user.backendToken) {
      config.headers.Authorization = `Bearer ${user.backendToken}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {}

  return config;
});

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();
    const user = session?.user as AuthUser;
    if (user.backendToken) {
      config.headers.Authorization = `Bearer ${user.backendToken}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.log(err);
  }

  return config;
});

export { apiServer, apiClient };
