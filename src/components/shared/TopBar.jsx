import { useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo } from "@/components";
import { Settings } from "lucide-react";
import { Moon, Sun, Search, CircleEllipsis, X, LogOut, Download } from "lucide-react";
import { useState } from "react";
import { useAuthStore, useThemeStore } from "@/store";

export const TopBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { isLoggedIn, user, logOut } = useAuthStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  
  const { pathname } = useLocation()
  
  const toggleMenu = () => {
    setIsOpenMenu(prev => !prev);
  };

  useEffect(() => {
    if(isOpenMenu){
      toggleMenu()
    }
  },[pathname]);

  return (
    <div className="fixed h-16 w-full top-0 z-50 bg-light-50 border-b-[.5px] padding-container md:hidden dark:bg-dark-primary dark:border-gray-800">
      <div className="h-full flex justify-between items-center">
        <Logo />

        <div className="space-x-3">
          <button onClick={toggleDarkMode} type="button">
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <button onClick={toggleMenu} type="button">
            {isOpenMenu ? <X /> : <CircleEllipsis />}
          </button>
        </div>
      </div>

      {isOpenMenu && <Menu toggleMenu={toggleMenu} />}
    </div>
  );
};

const Menu = ({ toggleMenu }) => {
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();

  const Logout = () => {
    logOut();
  };

  return (
    <div className="absolute right-6 top-12 w-[60vw] bg-white rounded-md shadow-lg dark:bg-dark-secondary dark:shadow-sm dark:shadow-gray-700">
      <div className="w-full py-4">
        <div className="px-4 py-2 flex items-center gap-1">
          <div className="">
            <span>Hi 👋,</span>
            <h2 className="heading4">{user?.name}</h2>
            <p className="text-sm text-gray-500 overflow-auto">{user?.email}</p>
          </div>
        </div>

        <button onClick={Logout} className="w-full text-left px-4 py-2 flex items-center gap-2" type="button">
          <LogOut size={18} />
          Logout
        </button>
        <Link to={import.meta.env.VITE_APK_URL} className="w-full text-left px-4 py-2 flex items-center gap-2" type="button">
          <Download size={18} />
          Get Apk
        </Link>
      </div>
    </div>
  );
};
