import { Outlet, Navigate } from "react-router-dom";
import SignupImage from "@/assets/images/sign-up.svg";
import { NavBarForGuest, Footer } from "@/components";
import { useAuthStore } from "@/store";

export const AuthLayout = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <NavBarForGuest />
          <main className="min-h-screen mt-[90px] max-container padding-container">
            <section className="min-h-[80vh] w-full md:flex justify-between items-center">
              <Outlet />
              <img className="hidden md:block md:max-w-[35vw]" src={SignupImage} alt="j" />
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
