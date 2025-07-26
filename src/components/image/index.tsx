import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils";
import { roundedMap } from "./image.style";
import { ImageProps } from "./image.type";

export const Image = ({
  src,
  alt = "",
  width = "auto",
  height = "auto",
  rounded = "md",
  className,
  aspectRatio,
}: ImageProps) => {
  const [error, setError] = useState(false);

  const ratioStyle =
    aspectRatio && !height
      ? { aspectRatio, width: "100%", objectFit: "cover" as const }
      : {};

  const commonClass = cn(
    "block transition-all duration-300",
    roundedMap[rounded],
    className
  );

  return error ? (
    <div
      className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground",
        "text-sm font-medium",
        commonClass
      )}
      style={{
        width,
        height,
        ...ratioStyle,
      }}
    >
      <ImageIcon className="w-6 h-6 opacity-60" />
      <span className="sr-only">Not Found</span>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      onError={() => setError(true)}
      className={cn("object-cover", commonClass)}
      style={ratioStyle}
    />
  );
};
