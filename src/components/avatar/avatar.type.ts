export type Size = "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: Size;
  status?: "online" | "offline";
  className?: string;
}

