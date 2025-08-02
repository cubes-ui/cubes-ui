import { cn } from "../../utils";

export const tabListStyles = (variant: "pill" | "underline", listClass?: string) => {
  return cn(
    "flex overflow-x-auto whitespace-nowrap scrollbar-custom",
    variant === "pill"
      ? "bg-gray-100 rounded-md p-1 space-x-1"
      : "pb-0",
    listClass
  );
};

export const tabButtonStyles = (variant: "pill" | "underline", isActive: boolean, tabClass?: string) => {
  const pill = cn(
    "relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-out",
    isActive
      ? "bg-white text-primary shadow ring-1 ring-primary/20"
      : "text-gray-600 hover:bg-white/60"
  );

  const underline = cn(
    "px-4 py-2 text-sm font-medium border-b-2 transition-all duration-300 ease-out",
    isActive
      ? "border-primary text-primary"
      : "border-transparent text-gray-500 hover:text-gray-700"
  );

  return cn(variant === "pill" ? pill : underline, tabClass);
};

export const tabPanelStyles = (panelClass?: string) =>
  cn("transition-opacity duration-500 ease-in-out mt-4", panelClass);
