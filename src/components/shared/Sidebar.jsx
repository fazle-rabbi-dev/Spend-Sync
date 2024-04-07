import { Link, useLocation } from "react-router-dom";
import { tabItems } from "@/constants";
import { Logo } from "@/components"
import { Moon, Sun } from "lucide-react"
import { useThemeStore, useAuthStore } from "@/store"

export const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useThemeStore()
  const { user, logOut } = useAuthStore(state => ({
    user: state.user,
    logOut: state.logOut
  }))
  
  const { pathname } = useLocation()
  
  return (
    <aside className="hidden fixed top-0 bottom-0 left-0 min-h-screen w-[30vw] bg-gray-200 px-6 pt-10 overflow-auto md:block dark:bg-dark-secondary dark:text-white">
      <div className="h-full w-full flex flex-col pb-10 justify-between">
        <div className="">
          <Logo size="text-4xl" />
          
          <div className="mt-3 bg-purple-100/60 shadow p-2 rounded text-purple-600 dark:bg-purple-600/40 dark:text-purple-200 ">
            <p className="text-sm">Hey 👋,</p>
            <p className="font-bold">{user?.name}</p>
            <p className="text-sm">
              {user?.email}
            </p>
          </div>
          
          <ul className="flex flex-col gap-3 my-8">
            {tabItems?.map((tab, index) => (
              <li key={index} className="text-2xl">
                <Link to={tab.link} className={`cursor-pointer block py-2 ${(pathname === tab.link) ? "text-purple-600 hover:text-purple-700 dark:text-purple-500 dark:hover:text-purple-400" : "text-gray-600 dark:text-gray-200 "}`}>
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center">
          <button onClick={logOut} className="bg-red-600 text-2xl text-white rounded-md py-2 px-4" type="button">
            Logout
          </button>
          <button onClick={toggleDarkMode} type="button">
            {
              darkMode ? <Sun size={35} /> : <Moon size={35} />
            }
          </button>
        </div>
      </div>
    </aside>
  );
};
