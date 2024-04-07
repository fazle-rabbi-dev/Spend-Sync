import { Link, useLocation } from "react-router-dom";
import { tabItems } from "@/constants";
import { Home } from "lucide-react";

export const BottomTabBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 z-50 h-24 w-full px-6 py-2 bg-white border-t-[1px] md:hidden dark:bg-dark-primary dark:border-gray-800">
      <ul className="h-full w-full flex justify-between items-center">
        {tabItems.map((tab, index) => (
          <li key={index} className="flex-1">
            <Link to={tab.link} className="flex flex-col gap-2 justify-center items-center text-gray-600 dark:text-gray-200 hover:text-gray-900">
              <span
                className={`px-4 py-1 dark:text-blue-200 ${pathname === tab.link && "rounded-lg bg-gray-100 dark:bg-dark-secondary"} `}
                dangerouslySetInnerHTML={{ __html: tab?.icon }}
              ></span>
              <p className={`text-sm text-center ${pathname === tab.link && "font-bold"}`}>{tab.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
