import FadeLoader from "react-spinners/ClipLoader";

export const Loader = ({ color }) => {
  return (
    <>
      <div className="flex justify-center items-center dark:hidden">
        <FadeLoader color={color || "#181818"} size={23} />
      </div>
      
      <div className="hidden flex justify-center items-center dark:flex">
        <FadeLoader color="#f8f8f8" size={23} />
      </div>
    </>
  );
};
