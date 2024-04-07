import { Link } from "react-router-dom";

export const Logo = ({ size }) => {
  return (
    <div className={`font-author-bold ${size ? size : "text-2xl"}`}>
      <Link className="flex items-center gap-2 bg-gradient-blue-sky bg-clip-text text-transparent" href="">
        <img className="w-6" src="/images/logo.png" alt="Logo" />
        Spend-Sync
      </Link>
    </div>
  );
};
