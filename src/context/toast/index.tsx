import { Toaster } from "sonner";

export const ToastProvider = () => (
  <Toaster
    closeButton
    richColors
    position="top-center"
    expand
    duration={4000}
    visibleToasts={5}
    toastOptions={{
      classNames: {
        toast: "border p-4 rounded-lg shadow-lg text-sm font-medium",
        title: "font-semibold text-base mb-1",
        description: "text-muted-foreground",
        cancelButton: "text-xs text-gray-500 hover:text-gray-700",
        actionButton:
          "bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700",
        closeButton: "text-xl hover:text-red-500 transition-all",
      },
    }}
  />
);
