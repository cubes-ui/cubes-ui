import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn, ToastOptions } from "../../utils";
import "./toast.css";

interface ToastItemProps extends ToastOptions {
  onClose: () => void;
}

export const Toast = ({
  message,
  variant = "info",
  duration = 3000,
  style = "solid",
  onClose,
}: ToastItemProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [progress, setProgress] = useState(100);
  const [exiting, setExiting] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    dialogRef.current?.show();

    const step = 100 / (duration / 100);

    const tick = () => {
      setProgress((prev) => {
        if (pausedRef.current) return prev;

        if (prev <= 0) {
          clearInterval(intervalRef.current!);
          triggerCloseWithAnimation();
          return 0;
        }
        return prev - step;
      });
    };

    intervalRef.current = window.setInterval(tick, 100);

    return () => clearInterval(intervalRef.current!);
  }, [duration]);

  const triggerCloseWithAnimation = () => {
    setExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
  };

  const handleCloseClick = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    triggerCloseWithAnimation();
  };

  const toastColorMap: Record<string, string> = {
    info: "var(--color-info)",
    success: "var(--color-success)",
    error: "var(--color-error)",
  };

  return (
    <dialog
      ref={dialogRef}
      open
      role="alertdialog"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ["--toast-color" as any]: toastColorMap[variant] || toastColorMap.info,
      }}
      className={cn(
        "toast-root",
        exiting ? "toast-exit" : "toast-enter",
        style !== "solid" && `toast-variant-${style}`,
        "!rounded",
        "!min-w-[200px] !max-w-[300px]"
      )}
    >
      <div className="flex items-start gap-4">
        <span
          data-style={style}
          className="text-sm data-[style=solid]:!text-white leading-relaxed truncate"
        >
          {message}
        </span>
        <button
          onClick={handleCloseClick}
          data-variant={variant}
          className={cn(
            "ml-auto hover:opacity-90 transition-opacity",
            style === "solid" ? "text-white" : "text-[currentColor]"
          )}
          title="Dismiss"
          aria-label="Dismiss toast"
        >
          <X size={16} />
        </button>
      </div>

      <div className="absolute left-0 bottom-0 h-[2px] w-full bg-white/20 rounded overflow-hidden">
        <div
          className="toast-progress h-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </dialog>
  );
};
