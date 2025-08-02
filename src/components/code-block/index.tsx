import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils";
import { tokenizeLine } from "./code-block.helper";
import { codeBlockStyles } from "./code-block.style";
import { CodeBlockProps } from "./code-block.type";

export function CodeBlock({
  code,
  fileName = "code.ts",
  language = "ts",
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Copy failed");
    }
  };

  const lines = code.split("\n");

  return (
    <div className={cn(codeBlockStyles.container, className)}>
      <div className={codeBlockStyles.header}>
        <span>{fileName || language.toUpperCase()}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
        >
          {copied ? (
            <Check size={16} className="text-green-600" />
          ) : (
            <Copy size={16} />
          )}
          <span className="sr-only">Copy code</span>
        </button>
      </div>
      <pre className={codeBlockStyles.code}>
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {tokenizeLine(line)}
          </div>
        ))}
      </pre>
    </div>
  );
}
