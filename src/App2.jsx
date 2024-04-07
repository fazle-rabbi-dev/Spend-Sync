import { useEffect, useState } from "react";
/*import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { SplashScreen } from "@/components";
import { useAuthStore } from "@/store"
import { PageLoader } from "@/components"
*/
import eruda from "eruda";
import router from "./routes";

function App() {

  useEffect(() => {
    eruda.init({
      element: document.getElementById("console"),
      tools: ["console"]
    });
  }, []);
  
  
  return (
    <>
      <h1>Hello</h1>
      
    </>
  );
}

export default App;