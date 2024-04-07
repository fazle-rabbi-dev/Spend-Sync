// import ClipLoader from "react-spinners/ClipLoader";
import GridLoader from "react-spinners/ClipLoader";

export const PageLoader = ({ color }) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="dark:hidden">
        <GridLoader color={color || "#181818"} size={30} aria-label="Loading Spinner" />
      </div>

      <div className="hidden dark:block">
        <GridLoader color={"#f8f8f8"} size={30} aria-label="Loading Spinner" />
      </div>
    </div>
  );
};
