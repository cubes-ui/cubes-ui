import { User } from "lucide-react";
import { sizeClasses, statusColors } from "./avatar.style";
import { AvatarProps } from "./avatar.type";
import { cn } from "../../utils";

export const Avatar = ({
  src,
  alt,
  fallback,
  size = "md",
  status,
  className,
}: AvatarProps) => {
  return (
    <div className={cn("relative inline-block", sizeClasses[size], className)}>
      {src ? (
        <img
          src={src}
          alt={alt ?? "Avatar"}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <div className="bg-gray-200 rounded-full flex items-center justify-center text-gray-700 w-full h-full">
          {fallback ? (
            <span className="font-medium">{fallback}</span>
          ) : (
            <User size={size == "sm" ? 16 : size == "md" ? 24 : 32} />
          )}
        </div>
      )}

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
