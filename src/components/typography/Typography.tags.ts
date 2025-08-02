import { JSX } from "react";
import { TypographyVariant } from "./typography.type";

export const validTags: Partial<
  Record<TypographyVariant, keyof JSX.IntrinsicElements>
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span: "span",
  blockquote: "blockquote",
  small: "small",
  code: "code",
  lead: "p",
  muted: "span",
};
