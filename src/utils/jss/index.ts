
let sharedStyleTag: HTMLStyleElement | null = null;
const styleMap = new Map<string, string>();
function ensureStyleTag(): HTMLStyleElement {
  if (typeof document === "undefined") return null as any;

  if (!sharedStyleTag) {
    sharedStyleTag = document.createElement("style");
    sharedStyleTag.setAttribute("data-cubes-ui", "dynamic");
    document.head.appendChild(sharedStyleTag);
  }
  return sharedStyleTag;
}
function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function jss(style: string): string {
  if (styleMap.has(style)) return styleMap.get(style)!;

  const className = `c-${hashString(style)}`;
  styleMap.set(style, className);

  if (typeof document !== "undefined") {
    const styleTag = ensureStyleTag();
    const rule = `.${className} { ${style} }`;
    styleTag.appendChild(document.createTextNode(rule + "\n"));
  }

  return className;
}
