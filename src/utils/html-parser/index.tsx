import { JSX } from "react";
import { cn } from "../cn";

interface ParsedNodeProps {
  className?: string;
}

interface ParserResult {
  isSafe: boolean;
  text: string;
  ParsedNode: (props: ParsedNodeProps) => JSX.Element | null;
}
export function htmlParser(input: string): ParserResult {
  const forbiddenTags = /<\s*(script|iframe|object|embed|style)\b[^>]*>/i;
  const jsProtocol = /javascript:/i;
  const eventAttributes = /\s*on\w+=["'][^"']*["']/gi;

  const hasDanger = forbiddenTags.test(input) || jsProtocol.test(input);
  const text = input
    .replace(/<\s*script\b[^>]*>.*?<\s*\/script\s*>/gis, "")
    .replace(/<\s*iframe\b[^>]*>.*?<\s*\/iframe\s*>/gis, "")
    .replace(/<\s*object\b[^>]*>.*?<\s*\/object\s*>/gis, "")
    .replace(/<\s*embed\b[^>]*>.*?<\s*\/embed\s*>/gis, "")
    .replace(/<\s*style\b[^>]*>.*?<\s*\/style\s*>/gis, "")
    .replace(eventAttributes, "")
    .replace(jsProtocol, "#");

  const ParsedNode = ({ className }: ParsedNodeProps): JSX.Element | null =>
    hasDanger ? null : (
      <pre
        className={cn(
          "parser text-base md:text-lg px-4 py-3 w-full text-wrap break-words overflow-hidden",
          className
        )}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );

  return {
    isSafe: !hasDanger,
    text,
    ParsedNode,
  };
}
