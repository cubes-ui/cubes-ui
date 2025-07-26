export interface ImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  aspectRatio?: string;
  fallbackSrc?: string;
}
