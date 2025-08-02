import { TypographyVariant } from "./typography.type";

export const typographyStyles: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-medium tracking-tight",
  p: "text-base leading-relaxed",
  span: "text-base",
  blockquote: "mt-6 border-l-2 pl-6 italic text-muted-foreground",
  small: "text-sm text-muted-foreground",
  lead: "text-xl text-muted-foreground",
  muted: "text-sm text-muted-foreground",
  code: "rounded bg-muted px-1.5 py-1 font-mono text-sm font-semibold",
};