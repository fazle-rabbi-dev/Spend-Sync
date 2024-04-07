import { Outlet, Navigate } from "react-router-dom";
import { BottomTabBar, Sidebar, TopBar } from "@/components";
import { useAuthStore } from "@/store";

export const PrivateLayout = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/sign-in" />
      ) : (
        <>
          <TopBar />
          <BottomTabBar />
          <Sidebar />
          <main className="min-h-screen mt-20 mb-28 padding-container md:ml-[32vw] md:mr-[2vw] md:mt-12">
            <Outlet />
          </main>
        </>
      )}
    </>
  );
};
