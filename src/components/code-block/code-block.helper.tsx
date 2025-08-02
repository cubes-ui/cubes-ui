import { ReactNode } from "react";

const keywords = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger", "default",
  "delete", "do", "else", "export", "extends", "finally", "for", "function", "if",
  "import", "in", "instanceof", "let", "new", "return", "super", "switch", "this",
  "throw", "try", "typeof", "var", "void", "while", "with", "yield"
]);

export function tokenizeLine(line: string): ReactNode[] {
  const tokens: ReactNode[] = [];
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    if (char === "/" && line[i + 1] === "/") {
      tokens.push(
        <span key={i} className="text-gray-400 italic">
          {line.slice(i)}
        </span>
      );
      break;
    }

    if (char === '"' || char === "'") {
      const quote = char;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) j++;
      tokens.push(
        <span key={i} className="text-green-600">
          {line.slice(i, j + 1)}
        </span>
      );
      i = j + 1;
      continue;
    }

    if (/\d/.test(char)) {
      let j = i;
      while (j < line.length && /\d/.test(line[j])) j++;
      tokens.push(
        <span key={i} className="text-yellow-700 font-semibold">
          {line.slice(i, j)}
        </span>
      );
      i = j;
      continue;
    }

    if (/\w/.test(char)) {
      let j = i;
      while (j < line.length && /\w/.test(line[j])) j++;
      const word = line.slice(i, j);

      if (keywords.has(word)) {
        tokens.push(
          <span key={i} className="text-purple-600 font-bold">
            {word}
          </span>
        );
      } else if (line[j] === "(") {
        tokens.push(
          <span key={i} className="text-blue-600">
            {word}
          </span>
        );
      } else {
        tokens.push(<span key={i}>{word}</span>);
      }

      i = j;
      continue;
    }

    tokens.push(<span key={i}>{char}</span>);
    i++;
  }

  return tokens;
}
