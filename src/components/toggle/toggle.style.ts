export const baseClasses =
  "px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none";

export const variantClasses = {
  solid: {
    on: "bg-primary-600 text-white hover:bg-primary-700",
    off: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  },
  outline: {
    on: "border border-primary-600 text-primary-600 bg-primary-50 hover:bg-primary-100",
    off: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  },
};

export const disabledClasses = "opacity-50 cursor-not-allowed";
