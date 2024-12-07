"use client";

import GoogleIcon from "@mui/icons-material/Google";
import SignUpForm from "@/components/auth/SignUpForm";
import LoadingButton from "@/components/common/LoadingButton";
import { Box, Divider, Link } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignUn() {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const onGoogleSignUp = async () => {
    setGoogleLoading(true);
    await signIn("google", {
      callbackUrl: "/",
    });
    setGoogleLoading(false);
  };

  return (
    <Box className="flex flex-col items-center gap-3">
      <SignUpForm />
      <Box className="my-2 w-full">
        <Divider flexItem>Or</Divider>
      </Box>
      <LoadingButton
        loading={googleLoading}
        onClick={onGoogleSignUp}
        variant="outlined"
        size="large"
        fullWidth
      >
        <GoogleIcon className="mr-2" />
        Sign Up With Google
      </LoadingButton>

      <Link href="/auth/signin" underline="hover">
        Already have an account?
      </Link>
    </Box>
  );
}
