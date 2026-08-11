export type FontStack = {
  id: string;
  label: string;
  category: string;
  stack: string;
};

export const FONT_STACKS: FontStack[] = [
  {
    id: "system-sans",
    label: "Système (sans)",
    category: "Sans-serif",
    stack: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: "grotesk",
    label: "Helvetica / Arial",
    category: "Sans-serif",
    stack: '"Helvetica Neue", Helvetica, "Liberation Sans", Arial, sans-serif',
  },
  {
    id: "humanist",
    label: "Optima / Candara",
    category: "Sans-serif",
    stack: 'Optima, Candara, "Gill Sans", "Gill Sans MT", sans-serif',
  },
  {
    id: "geometric",
    label: "Futura / Century Gothic",
    category: "Sans-serif",
    stack:
      'Futura, "Century Gothic", "Twentieth Century", "Trebuchet MS", sans-serif',
  },
  {
    id: "rounded",
    label: "Arrondie",
    category: "Sans-serif",
    stack:
      'ui-rounded, "SF Pro Rounded", "Segoe UI Variable", Avenir, sans-serif',
  },
  {
    id: "screen-sans",
    label: "Verdana / Tahoma",
    category: "Sans-serif",
    stack: 'Verdana, Tahoma, "DejaVu Sans", "Segoe UI", sans-serif',
  },
  {
    id: "old-style",
    label: "Iowan / Palatino",
    category: "Serif",
    stack:
      '"Iowan Old Style", "Palatino Linotype", Palatino, Charter, Georgia, serif',
  },
  {
    id: "transitional",
    label: "Baskerville / Hoefler",
    category: "Serif",
    stack: 'Baskerville, "Hoefler Text", Cambria, "Times New Roman", serif',
  },
  {
    id: "didone",
    label: "Didot / Bodoni",
    category: "Serif",
    stack: 'Didot, "Bodoni 72", "Bodoni MT", "Playfair Display", serif',
  },
  {
    id: "slab",
    label: "Rockwell / American Typewriter",
    category: "Serif",
    stack:
      'Rockwell, "American Typewriter", "Roboto Slab", "Courier New", serif',
  },
  {
    id: "mono",
    label: "Monospace système",
    category: "Monospace",
    stack:
      'ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace',
  },
];

export const DEFAULT_FONT_ID = "system-sans";

