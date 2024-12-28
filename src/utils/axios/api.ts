import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import type AuthUser from "@/app/api/auth/[...nextauth]/authUser";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { setupCache } from "axios-cache-interceptor";

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiServer.interceptors.request.use(async (config) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return config;
    }

    const user = session?.user as AuthUser;
    if (user.backendToken) {
      config.headers.Authorization = `Bearer ${user.backendToken}`;
    }
  } catch (err) {
    console.log(err);
  }

  return config;
});

const apiServerCachedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiServerCached = setupCache(apiServerCachedInstance, {
  ttl: 1000 * 60 * 60 * 24,
});

apiServerCached.interceptors.request.use(async (config) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return config;
    }

    const user = session?.user as AuthUser;
    if (user.backendToken) {
      config.headers.Authorization = `Bearer ${user.backendToken}`;
    }
  } catch (err) {
    console.log(err);
  }

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
    if (!session) {
      return config;
    }

    const user = session?.user as AuthUser;
    if (user.backendToken) {
      config.headers.Authorization = `Bearer ${user.backendToken}`;
    }
  } catch (err) {
    console.log(err);
  }

  return config;
});

const apiClientCachedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClientCached = setupCache(apiClientCachedInstance, {
  ttl: 1000 * 60 * 60 * 24,
});

apiClientCached.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();
    if (!session) {
      return config;
    }

    const user = session?.user as AuthUser;
    if (user.backendToken) {
      config.headers.Authorization = `Bearer ${user.backendToken}`;
    }
  } catch (err) {
    console.log(err);
  }

  return config;
});

export { apiServer, apiServerCached, apiClient, apiClientCached };
