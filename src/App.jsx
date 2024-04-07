import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import eruda from "eruda";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { SplashScreen } from "@/components";
import { useAuthStore, useThemeStore } from "@/store";
import { PageLoader } from "@/components";

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const { isAuthLoading, checkAuth } = useAuthStore();
  const { darkMode, enableDarkMode } = useThemeStore();

  useEffect(() => {
    /*eruda.init({
      element: document.getElementById("console"),
      tools: ["console"]
    });*/

    checkAuth();

    setTimeout(() => {
      // setShowSplash(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (darkMode) {
      enableDarkMode();
    }
  }, [darkMode]);

  if (isAuthLoading) {
    return <PageLoader />;
  }

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <RouterProvider router={router} />
          <Toaster />
          <p id="console"></p>
        </>
      )}
    </>
  );
}

export default App;
