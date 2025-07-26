/**
 * Determines if a color string (hex, rgb[a], hsl[a], oklch) is dark.
 *
 * @param color - A CSS color string.
 * @returns `true` if the color is visually dark.
 */
export function isDarkColor(color?: string): boolean {
  if (!color || typeof color !== "string") return false;

  color = color.trim().toLowerCase();

  // HEX format
  const hexMatch = color.match(/^#?([a-f\d]{3}|[a-f\d]{6})$/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return getLuminance(r, g, b) < 128;
  }

  // RGB / RGBA
  const rgbMatch = color.match(/^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*[\d.]+)?\)$/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch.map(Number);
    return getLuminance(r, g, b) < 128;
  }

  // HSL / HSLA
  const hslMatch = color.match(/^hsla?\((\d{1,3}),\s*(\d{1,3})%?,\s*(\d{1,3})%?(?:,\s*[\d.]+)?\)$/);
  if (hslMatch) {
    const [, h, s, l] = hslMatch.map(Number);
    const { r, g, b } = hslToRgb(h, s / 100, l / 100);
    return getLuminance(r, g, b) < 128;
  }

  // OKLCH format: oklch(0.5 0.1 200)
  const oklchMatch = color.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\)$/);
  if (oklchMatch) {
    const lightness = parseFloat(oklchMatch[1]);
    return lightness < 0.5; // Threshold: 0.5 based on W3C recommendation
  }

  return false;
}

function hslToRgb(h: number, s: number, l: number) {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return { r: f(0), g: f(8), b: f(4) };
}

function getLuminance(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}
