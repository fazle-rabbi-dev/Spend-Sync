import { Link } from "react-router-dom";
import { tabItems } from "@/constants";
import { Logo } from "@/components"
import { Moon, Sun } from "lucide-react"
import { useThemeStore } from "@/store"

export const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useThemeStore()
  
  return (
    <aside className="hidden fixed top-0 bottom-0 left-0 min-h-screen w-[30vw] bg-gray-200 px-6 pt-10 overflow-auto md:block dark:bg-dark-secondary dark:text-white">
      <div className="h-full w-full flex flex-col pb-10 justify-between">
        <div className="">
          <Logo />
          <ul className="flex flex-col gap-3 my-8">
            {tabItems?.map((tab, index) => (
              <li key={index} className="text-2xl">
                <Link to={tab.link} className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-50 dark:hover:text-blue-200">
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-red-600 text-2xl text-white rounded-md py-2 px-4" type="button">
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
