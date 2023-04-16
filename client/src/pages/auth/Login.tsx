import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { ValueType } from "./Register";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getTokenCookie, setTokenCookie } from "../../utils/auth";
import useAuthContext from "../../hooks/useAuthContext";

const Login = () => {
  const [value, setValue] = useState<ValueType>({
    email: "",
    password: "",
  });
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const accessToken = getTokenCookie();

  const loginMutation = useMutation({
    mutationFn: (data: ValueType) => {
      return axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data);
    },
    onSuccess: (res: any) => {
      if (res?.data?.token) {
        toast.success(res.data.message);
        // set token to global context
        dispatch({
          type: "login",
          payload: res.data.token,
        });
        // set token to local storage
        setTokenCookie(res.data.token);
        navigate("/");
      }
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    loginMutation.mutate(value);
  };

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex rounded items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white drop-shadow-lg">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  className="relative block w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={value.password}
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                  className="relative block w-full rounded border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/auth/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't have an account? Register here
                </Link>
              </div>
            </div>

            <div>
              <button
                disabled={loginMutation?.isLoading}
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
