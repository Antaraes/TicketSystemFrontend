// import { error } from "console";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import * as apis from "./api";
import { cookies } from "next/dist/client/components/headers";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useIsAdminContext } from "@/context/IsAdmin";
interface LoginProps {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginProps> = ({ login, setLogin }) => {
  const router = useRouter();
  const [username, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookies] = useCookies([""]);
  const [isAdmin, setIsAdmin] = useIsAdminContext();
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const body = JSON.stringify({
      username,
      password,
    });
    try {
      localStorage.removeItem("access");
      await apis.LogIn({ username, password }).then((resp) => {
        if (resp.status == 200) {
          console.log(localStorage.removeItem("access"));
          localStorage.setItem("access", JSON.stringify(resp["data"]["data"].access));
          const user = resp.data.data.user;
          if (user.role == "ADMIN") {
            setIsAdmin(true);
          }
          setTimeout(() => {
            console.log(isAdmin);

            router.push("/");
          }, 800);
        }
      });
      // const api = await fetch("http://127.0.0.1:8000/login/", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: body,
      // });
      // const data = await api.json();
      // console.log(api);

      // const acceesToken = data["data"]["access"];

      // if (api.status === 200) {
      //   localStorage.setItem("authTokens", JSON.stringify(data.data.access));
      //   await router.push("/");
      // } else {
      //   await router.push("/login");
      // }
    } catch (err) {
      console.log(err);
    }
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submit} className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete=""
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Link href={"/"} onClick={() => setLogin(true)}>
                  Skip Now
                </Link>
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">Not a member?</p>
        </div>
      </div>
    </>
  );
};

export default Login;
