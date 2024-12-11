import { apiClient } from "@/utils/axios/api";
import { signIn } from "next-auth/react";
import { useState } from "react";
import ErrorSnackbar from "../common/ErrorSnackbar";
import PasswordField from "../common/inputs/PasswordField";
import ValidateField from "../common/inputs/ValidateField";
import LoadingButton from "../common/LoadingButton";

type SignUpError = {
  username?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

export default function SignUpForm() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [usernameValid, setUsernameValid] = useState<boolean>(false);
  const [usernameCheck, setUsernameCheck] = useState<boolean>(false);

  const [error, setError] = useState<SignUpError>({});
  const [signUpError, setSignUpError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const removeError = (remove: keyof SignUpError) => {
    setError((prev) => {
      delete prev[remove];
      return { ...prev };
    });
  };

  const checkEmail = async () => {
    if (!email.length) {
      setError((prev) => ({
        ...prev,
        email: "This field should not be empty",
      }));
    } else if (!email.match(/.+@.+/)) {
      setError((prev) => ({
        ...prev,
        email: "This is not a valid email",
      }));
    } else {
      try {
        setEmailCheck(true);
        const user = (await apiClient.get(`/users/email/${email}`)).data;
        if (user) {
          setError((prev) => ({
            ...prev,
            email: "This email is already used",
          }));
        } else {
          setEmailValid(true);
          setEmailCheck(false);
          return;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setEmailCheck(false);
      }

      setEmailValid(false);
    }
  };

  const checkUsername = async () => {
    if (!username.length) {
      setError((prev) => ({
        ...prev,
        username: "This field should not be empty",
      }));
    } else {
      try {
        setUsernameCheck(true);
        const user = (await apiClient.get(`/users/name/${username}`)).data;

        if (user) {
          setError((prev) => ({
            ...prev,
            username: "This username is already taken",
          }));
        } else {
          setUsernameValid(true);
          setUsernameCheck(false);
          return;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setUsernameCheck(false);
      }

      setUsernameValid(false);
    }
  };

  const checkRepeatPassword = () => {
    if (!repeatPassword.length) {
      setError((prev) => ({
        ...prev,
        repeatPassword: "This field should not be empty",
      }));
    } else if (password.length && repeatPassword !== password) {
      setError((prev) => ({
        ...prev,
        repeatPassword: "Passwords do not match",
      }));
    }
  };

  const checkPassword = () => {
    if (!password.length) {
      setError((prev) => ({
        ...prev,
        password: "This field should not be empty",
      }));
    } else if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "Password should have at least 8 symbols",
      }));
    }
    if (repeatPassword.length) {
      checkRepeatPassword();
    }
  };

  const buttonDisabled = Boolean(
    !emailValid ||
      !usernameValid ||
      !password ||
      !repeatPassword ||
      error.password ||
      error.repeatPassword
  );

  const onSignUp = async () => {
    setLoading(true);
    try {
      await apiClient.post("/auth/signup", { email, name: username, password });

      signIn("credentials", {
        username: email,
        password,
        callbackUrl: "/",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ValidateField
        valid={emailValid}
        loading={emailCheck}
        label="Email"
        type="email"
        name="email"
        margin="dense"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => {
          removeError("email");
        }}
        onBlur={checkEmail}
        error={!!error.email}
        helperText={error.email}
        fullWidth
      />
      <ValidateField
        valid={usernameValid}
        loading={usernameCheck}
        label="Username"
        name="username"
        type="text"
        margin="dense"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onFocus={() => {
          removeError("username");
        }}
        onBlur={checkUsername}
        error={!!error.username}
        helperText={error.username}
        fullWidth
      />
      <PasswordField
        label="Password"
        name="password"
        margin="dense"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => removeError("password")}
        onBlur={checkPassword}
        error={!!error.password}
        helperText={error.password}
        fullWidth
      />
      <PasswordField
        label="Repeat Password"
        name="repeatPassword"
        margin="dense"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        onFocus={() => removeError("repeatPassword")}
        onBlur={checkRepeatPassword}
        error={!!error.repeatPassword}
        helperText={error.repeatPassword}
        fullWidth
      />
      <LoadingButton
        loading={loading}
        onClick={onSignUp}
        disabled={buttonDisabled}
        variant="outlined"
        size="large"
        fullWidth
      >
        Sign Up
      </LoadingButton>
      <ErrorSnackbar
        open={signUpError}
        onClose={() => setSignUpError(false)}
        message="Something went wrong. Try again"
      />
    </>
  );
}
