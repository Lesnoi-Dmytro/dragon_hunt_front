"use client";

import ErrorSnackbar from "@/components/common/ErrorSnackbar";
import LoadingButton from "@/components/common/LoadingButton";
import GoogleIcon from "@mui/icons-material/Google";

import { Box, Button, Divider, Link, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const searchParams = useSearchParams();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const [signInLoading, setSignInLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const onSignIn = async () => {
    setSignInLoading(true);
    await signIn("credentials", {
      username,
      password,
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });
    setSignInLoading(false);
  };

  const onGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn("google", {
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });
    setGoogleLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("error")) {
      setInvalidCredentials(true);
    }
  }, [searchParams]);

  return (
    <Box className="flex flex-col items-center gap-3">
      <TextField
        label="Email"
        type="email"
        margin="dense"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        margin="dense"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Link href="/auth/signin" underline="hover">
        Forgot Password?
      </Link>
      <LoadingButton
        loading={signInLoading}
        onClick={onSignIn}
        disabled={!username || !password}
        variant="outlined"
        size="large"
        fullWidth
      >
        Sign In
      </LoadingButton>
      <Box className="my-2 w-full">
        <Divider flexItem>Or</Divider>
      </Box>
      <LoadingButton
        loading={googleLoading}
        variant="outlined"
        onClick={onGoogleSignIn}
        size="large"
        fullWidth
      >
        <GoogleIcon className="mr-2" /> Sign In With Google
      </LoadingButton>

      <Link href="/auth/signup" underline="hover">
        Don't have an account?
      </Link>

      <ErrorSnackbar
        open={invalidCredentials}
        onClose={() => setInvalidCredentials(false)}
        message="Invalid Credentials"
      />
    </Box>
  );
}
