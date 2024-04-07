import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="mt-20 relative">
      <h1 className="heading2 mb-4">
        Your Go To <span className="bg-gradient-to-r from-purple-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">Expense</span> Tracker
      </h1>
      <p className="text-lg mb-8">Track your money spending and become a pro in managing money effectively.</p>
      <div className="absolute bottom-0 right-6 bg-gradient-to-b from-blue-600 to-green-500 h-[50%] w-[40%] blur-2xl -z-10 opacity-30"></div>

      <div className="flex flex-wrap items-center gap-2">
        <Link to="/sign-up" className="bg-gradient-blue-sky font-bold text-white rounded-md px-6 py-3 " type="button">
          Get Started
        </Link>
        <Link to="/sign-in" className="border-[1px] border-black text-black rounded-md px-6 py-3 dark:text-white dark:border-white" type="button">
          Sign in
        </Link>
      </div>
    </section>
  );
};
