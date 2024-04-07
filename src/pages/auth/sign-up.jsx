import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { useForm } from "react-hook-form";
import { PageLayout, Loader } from "@/components";
import { useCreateUserAccount } from "@/lib/react-query";
import { showToast } from "@/lib/utils";
import { signUpSchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { authFormFields } from "@/constants";

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema)
  });

  const { mutateAsync: createAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const navigate = useNavigate();

  const onSubmit = async data => {
    if (!data) {
      return showToast("Invalid form input.", "error");
    }

    const res = await createAccount(data);
    
    if (res?.code === 409) {
      showToast("Oops! This email is already in use. Please try another one.", "error", 4000);
    } else if (res?.code === 429) {
      showToast("You're trying too often. Wait & try again later.", "error", 3000);
    } else {
      showToast("Signed up successfully.");
      navigate("/sign-in");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-md px-8 pt-6 pb-8 md:bg-transparent md:shadow-none dark-theme">
          <div className="">
            <h1 className="heading3 text-gray-800 mb-2 dark:text-white">🔐 Sign Up</h1>
            <p className="text-sm text-gray-500 mb-6 dark:text-gray-300">
              Join us and start managing your expenses today! Please fill out the form below to create your account.
            </p>
          </div>
          {/* Map through authFormFields array to render input fields */}
          {authFormFields.map(field => (
            <div className="mb-4" key={field.name}>
              <label htmlFor={field.name} className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
                {field.label}
              </label>
              <input
                {...register(field.name)}
                id={field.name}
                className={`auth-form-input ${
                  errors[field.name] ? "border-red-500" : ""
                }`}
                type={field.type}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
              {errors[field.name] && <p className="text-red-500 text-xs italic">{errors[field.name].message}</p>}
            </div>
          ))}
          {/* Sign in link */}

          <div className="flex items-center justify-between mb-4">
            <button
              disabled={isCreatingAccount}
              type="submit"
              className="auth-submit-btn"
            >
              {isCreatingAccount && <Loader color="#fff" />}
              <span>{isCreatingAccount ? "Signing up" : "Sign Up"}</span>
            </button>
          </div>
          <div className="text-center text-sm mb-6">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-bold text-black hover:underline dark:text-white">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
