import { cn } from "cubes-ui";
import { Fragment, useEffect, useRef, useState } from "react";
import { Toast } from "../../components/toast";
import { toast, ToastOptions } from "../../utils";
import { positionMap } from "../../components/toast/toast.style";

type ToastWithID = ToastOptions & { id: number };

export const ToastProvider = () => {
  const [toasts, setToasts] = useState<ToastWithID[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    toast._register((options) => {
      const id = idRef.current++;
      setToasts((prev) => [...prev, { ...options, id }]);
    });
  }, []);

  const remove = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const groupedToasts = toasts.reduce<Record<string, ToastWithID[]>>(
    (acc, toast) => {
      const loc = toast.location || "top-right";
      acc[loc] = acc[loc] || [];
      acc[loc].push(toast);
      return acc;
    },
    {}
  );

  return (
    <Fragment>
      {Object.entries(groupedToasts).map(([location, stack]) => (
        <div
          key={location}
          className={cn("fixed z-50 space-y-2", positionMap[location])}
        >
          {stack.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={() => remove(toast.id)} />
          ))}
        </div>
      ))}
    </Fragment>
  );
};
