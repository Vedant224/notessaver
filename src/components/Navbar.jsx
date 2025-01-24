import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] flex items-center justify-between px-4 bg-gray-800 dark:bg-gray-800">
      <div className="flex justify-center flex-grow gap-x-5">
        {NavbarData.filter(link => link.title === 'Home' || link.title === 'Paste').map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-semibold text-xl"
                : "text-blue-600 dark:text-blue-400 font-medium text-xl"
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>
      <div className="flex-none">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
