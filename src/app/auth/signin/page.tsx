"use client";

import SignInForm from "@/components/auth/SignInForm";
import LoadingButton from "@/components/common/LoadingButton";
import GoogleIcon from "@mui/icons-material/Google";

import { Box, Divider, Link } from "@mui/material";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const searchParams = useSearchParams();

  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const onGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn("google", {
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });
    setGoogleLoading(false);
  };

  return (
    <Box className="flex flex-col items-center gap-3">
      <SignInForm />
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
        Don&apos;t have an account?
      </Link>
    </Box>
  );
}
