import { Loader } from "lucide-react";

const SubmitButton = ({
  title,
  buttonType = "submit",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <>
      {isLoading ? (
        <button
          type={buttonType}
          disabled={isLoading || disabled}
          className="w-full md:w-1/2 flex items-center justify-center gap-2 bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <Loader className="w-4 h-4 flex-shrink-0 animate-spin" />
          Loading please wait...
        </button>
      ) : (
        <button
          type={buttonType}
          className={`w-full md:w-1/2 px-6 py-3 rounded text-sm font-medium tracking-wide text-white transition-colors duration-200 ease-in-out bg-sky-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading || disabled}
        >
          {title}
        </button>
      )}
    </>
  );
};

export default SubmitButton;
