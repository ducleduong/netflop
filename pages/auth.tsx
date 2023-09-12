import Input from "../components/input";
import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [variant, setVariant] = useState<"login" | "register">("login");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    if (rePassword !== password) {
      setErrorMessage("Password and re-type password is not match");
      return;
    }
    try {
      await axios.post("/api/register", { email, password });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, login, rePassword]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-70">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo-netflop.png"
            alt="logo"
            height={48}
            width={1280}
            className="h-12 w-40"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-80 px-16 py-16 self-center mt-2 lg:w-2/5 lh:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Sign up"}
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                id="email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                type="email"
                value={email}
              />
              <Input
                label="Password"
                id="password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                type="password"
                value={password}
              />
              {variant === "register" && (
                <Input
                  label="Re-type Password"
                  id="re-password"
                  onChange={(ev: any) => setRePassword(ev.target.value)}
                  type="password"
                  value={rePassword}
                />
              )}
            </div>
            <p className="text-rose-500 mt-2">{errorMessage}</p>
            <button
              className="bg-[#3576df] py-3 text-white rounded-md w-full mt-10 hover:bg-blue-400 transition"
              onClick={variant === "login" ? login : register}
            >
              {variant === "login" ? "Login" : "Create account"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflop?"
                : "Already have account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
