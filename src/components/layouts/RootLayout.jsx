import { Outlet, Navigate } from "react-router-dom";
import { NavBarForGuest, Footer } from "@/components";
import { useAuthStore } from "@/store";

export const RootLayout = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <NavBarForGuest />
          <main className="min-h-screen max-container padding-container mt-[75px] mb-10 md:mt-[100px]">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
