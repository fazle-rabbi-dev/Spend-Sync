import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, X, Github, AlignRight } from "lucide-react";
import { NavLinksForGuest } from "@/constants";
import { Logo } from "@/components";
import { useThemeStore } from "@/store";

export const NavBarForGuest = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    const handleBodyScroll = () => {
      document.body.style.overflow = isNavOpen ? "hidden" : "auto";
    };

    handleBodyScroll();

    return () => {
      document.body.style.overflow = "auto"; // Ensure body scrolling is enabled when component unmounts
    };
  }, [isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  return (
    <header className="fixed z-50 top-0 h-[60px] w-full bg-light-50 shadow padding-container py-2 md:px-20 md:py-4 dark-theme">
      <div className="md:flex h-full justify-between items-center ">
        <div className="h-full">
          <div className="flex h-full w-full flex-between">
            <Logo />

            <div className="flex gap-2 items-center md:hidden">
              <button className="" type="button">
                <Link to="https://github.com/fazle-rabbi-dev/Spend-Sync" target="_blank">
                  <Github size={20} />
                </Link>
              </button>
              <button onClick={toggleDarkMode} className="" type="button">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={toggleNav} className="bg-none border-0" type="button">
                <AlignRight size={25} />
              </button>
            </div>
          </div>
        </div>

        {isNavOpen && <MobileMenu toggleNav={toggleNav} />}
        <DesktopMenu />
      </div>
    </header>
  );
};

const MobileMenu = ({ toggleNav }) => {
  const { pathname } = useLocation();

  return (
    <nav className="absolute top-0 right-0 h-screen w-full bg-black/30 backdrop-blur flex justify-end">
      <div className="bg-light-50 shadow-md h-screen w-[80vw] py-5 px-6 dark-theme">
        <div className="flex justify-between items-center">
          <Logo />
          <button className="bg-gray-100 text-gray-600 p-2 rounded" onClick={toggleNav} type="button">
            <X />
          </button>
        </div>

        <ul className="mt-6 space-y-4">
          {NavLinksForGuest?.map(link => (
            <li onClick={toggleNav} key={link.id}>
              <Link className={`block py-1 ${link.href === pathname && "text-gradient-blue-sky font-bold"}`} to={link.href}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const DesktopMenu = () => {
  const { pathname } = useLocation();

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-4 items-center">
        {NavLinksForGuest?.map(link => (
          <li key={link.id}>
            <Link className={link.href === pathname && "text-primary-70 font-bold"} to={link.href}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
