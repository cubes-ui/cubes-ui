type Oklch = { l: number; c: number; h: number };
type Palette = Record<
  50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  string
>;

interface ThemePalette {
  palette: Palette;
  tailwindTheme: string;
}
function formatOklch({ l, c, h }: Oklch): string {
  return `oklch(${l.toFixed(0)}% ${c.toFixed(3)} ${h.toFixed(0)})`;
}
export function themeCreator(
  baseColor: string,
  backgroundColor = "white",
  foregroundColor = "black"
): ThemePalette {
  if (!baseColor.startsWith("oklch(")) {
    throw new Error("Only oklch colors are supported");
  }

  const match = baseColor.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/i);
  if (!match) throw new Error("Invalid oklch color format");

  const baseL = Number(match[1]);
  const baseC = Number(match[2]);
  const baseH = Number(match[3]);

  const lightnessSteps = [97, 94, 91, 87, 82, 76, 65, 52, 38, 25];
  const chromaSteps = [
    0.035, 0.055, 0.075, 0.1, 0.12, 0.135, 0.12, 0.1, 0.075, 0.05,
  ];

  const levels: (keyof Palette)[] = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
  ];

  const palette: Partial<Palette> = {};

  levels.forEach((level, i) => {
    palette[level] = formatOklch({
      l: lightnessSteps[i],
      c: chromaSteps[i],
      h: baseH,
    });
  });

  const tailwindTheme =
    `@theme { ` +
    `--color-background: ${backgroundColor}; ` +
    `--color-foreground: ${foregroundColor}; ` +
    levels
      .map((level) => `--color-primary-${level}: ${palette[level]};`)
      .join(" ") +
    ` }`;

  return {
    palette: palette as Palette,
    tailwindTheme,
  };
}
