import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader } from "@/components";
import { useSigninAccount } from "@/lib/react-query";
import { showToast } from "@/lib/utils";
import { signInSchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/store";
import { signInWithGithub, signInWithGoogle, saveUserAfterSocialAuth } from "@/lib/appwrite/api";

export const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signInSchema)
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { mutateAsync: signinAccount, isPending: isSigningIn } = useSigninAccount();
  const { checkAuth } = useAuthStore();

  const onSubmit = async data => {
    const res = await signinAccount(data)
    
    if (!res?.$id) {
      showToast("Invalid email or password.", "error");
    } else {
      await checkAuth()
      showToast("Logged in successfully.")
      navigate("/dashboard");
    }
  };

  const authenticateUser = async () => {
    const res = await saveUserAfterSocialAuth();

    if (!res?.ok) {
      showToast("Login failed.", "error", 2000);
    } else {
      await checkAuth()
      showToast("Logged in successfully.");
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);

      if (params.get("authstatus") === "success") {
        authenticateUser();
      }
      if (params.get("authstatus") === "failed") {
        console.log("failed");
        showToast("Login failed.", "error", 2000);
      }
    }
  }, [location]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full">
        <div className="bg-white shadow rounded-md px-8 pt-6 pb-8 md:bg-transparent md:shadow-none dark-theme">
          <h1 className="heading3 text-gray-800 mb-2 dark:text-white">{"🔐"} Sign In</h1>
          <p className="text-sm text-gray-500 mb-6 dark:text-gray-300">Welcome back! Let's get you signed in.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                className={`auth-form-input ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="emal"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                id="password"
                className={`auth-form-input ${
                  errors.password ? "border-red-500" : ""
                }`}
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between mb-6">
              <button
                disabled={isSigningIn}
                type="submit"
                className="auth-submit-btn"
              >
                {isSigningIn && <Loader color="#fff" />}
                <span>{isSigningIn ? "Signing in" : "Sign In"}</span>
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mb-4">
            <hr className="flex-grow border-gray-200" />
            <span className="text-sm text-gray-600 mx-4 dark:text-gray-300">OR</span>
            <hr className="flex-grow border-gray-200" />
          </div>
          <div className="flex flex-col gap-3 mb-4">
            <button
              onClick={signInWithGoogle}
              className="w-full flex justify-center items-center gap-2 border-[1px] border-black text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:text-white dark:border-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                <path
                  fill="#ffc107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                />
                <path
                  fill="#ff3d00"
                  d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                />
                <path
                  fill="#4caf50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                />
                <path
                  fill="#1976d2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                />
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              onClick={signInWithGithub}
              className="w-full flex justify-center items-center gap-1 border-[1px] border-black text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:text-white dark:border-white"
            >
              <span className="hidden dark:inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    fill-rule="evenodd"
                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44a10.32 10.32 0 0 0-3.393 6.17a10.48 10.48 0 0 0 1.317 6.955a10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494c0-.245-.01-1.052-.014-1.908c-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621c.317.044.62.163.885.346c.266.183.487.426.647.71c.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37c-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75a3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05c.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814c0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421a10.473 10.473 0 0 0 1.313-6.948a10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span className="dark:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="black"
                    fill-rule="evenodd"
                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44a10.32 10.32 0 0 0-3.393 6.17a10.48 10.48 0 0 0 1.317 6.955a10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494c0-.245-.01-1.052-.014-1.908c-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621c.317.044.62.163.885.346c.266.183.487.426.647.71c.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37c-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75a3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05c.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814c0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421a10.473 10.473 0 0 0 1.313-6.948a10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Continue with GitHub
            </button>
          </div>
          <div className="text-sm text-center text-gray-600 mb-6 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-black font-bold hover:underline dark:text-white">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
