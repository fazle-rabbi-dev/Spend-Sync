import { Link } from "react-router-dom";
import { features } from "@/constants";
import { Hero } from "@/components";

export const Home = () => {
  return (
    <>
      <Hero />

      {/* About section */}
      <section className="text-center py-16 ">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 dark:text-gray-100">Welcome to our amazing expense tracker!</h2>
        <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">
          Imagine a world where managing your expenses is easy, intuitive, and enjoyable. That's what our expense tracker app is all about!
        </p>
        <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">
          It's completely free forever and packed with unique features to help you take control of your finances.
        </p>
      </section>

      {/* Features section */}
      <section className="">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <li key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center dark-theme">
              <div className="bg-gray-200 rounded-full p-4 mb-4">
                <span role="img" aria-label="emoji" className="text-3xl">
                  {feature.emoji}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 text-center dark:text-gray-300">{feature.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
