import { Link, TextField } from "@mui/material";
import LoadingButton from "@/components/common/LoadingButton";
import ErrorSnackbar from "@/components/common/ErrorSnackbar";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignInForm() {
  const searchParams = useSearchParams();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const [signInLoading, setSignInLoading] = useState<boolean>(false);

  const onSignIn = async () => {
    setSignInLoading(true);
    await signIn("credentials", {
      username,
      password,
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });
    setSignInLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("error")) {
      setInvalidCredentials(true);
    }
  }, [searchParams]);

  return (
    <>
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

      <ErrorSnackbar
        open={invalidCredentials}
        onClose={() => setInvalidCredentials(false)}
        message="Invalid Credentials"
      />
    </>
  );
}
