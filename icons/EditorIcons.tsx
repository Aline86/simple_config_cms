// ============================================
// components/editor/icons/EditorIcons.tsx
// ============================================

import { SVGProps } from "react";

interface IconProps {
  className?: string;
}

type PathProps = Omit<SVGProps<SVGPathElement>, "ref">;
type CircleProps = Omit<SVGProps<SVGCircleElement>, "ref">;

type ShapeProps =
  | ({ type: "path" } & PathProps)
  | ({ type: "circle" } & CircleProps);

const createIcon = (shapes: ShapeProps[], viewBox: string = "0 0 24 24") => {
  return ({ className = "w-5 h-5" }: IconProps) => (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {shapes.map((shape, index) => {
        const { type, ...props } = shape;
        if (type === "circle") {
          return <circle key={index} {...(props as CircleProps)} />;
        }
        return <path key={index} {...(props as PathProps)} />;
      })}
    </svg>
  );
};

export const BoldIcon = createIcon([
  {
    type: "path",
    d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z",
    fill: "currentColor",
  },
  {
    type: "path",
    d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z",
    fill: "currentColor",
  },
]);

export const ItalicIcon = createIcon([
  {
    type: "path",
    d: "M19 4h-9l-4 16h9",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  {
    type: "path",
    d: "M15 4h4M9 20h4",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
  },
]);

export const StrikethroughIcon = createIcon([
  {
    type: "path",
    d: "M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.2.1-4.4.6-6.1 1.6-1.2.7-1.9 1.7-1.9 2.9 0 1.3.9 2.3 2.3 3",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
  },
  {
    type: "path",
    d: "M3 12h18",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
  },
  {
    type: "path",
    d: "M16 16.4c0 .8-.3 1.6-1 2.2-1.4 1.2-3.6 1.9-6 1.9-1.5 0-3-.3-4.3-.7",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
  },
]);

export const UnderlineIcon = createIcon([
  {
    type: "path",
    d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  {
    type: "path",
    d: "M4 21h16",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
  },
]);

export const H2Icon = createIcon([
  {
    type: "path",
    d: "M4 6v12M4 12h8M12 6v12",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  {
    type: "path",
    d: "M20 8v5.5a2.5 2.5 0 0 1-2.5 2.5H17v-2h3",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  {
    type: "path",
    d: "M17 18h3",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
  },
]);

export const BulletListIcon = createIcon([
  { type: "circle", cx: 5, cy: 6, r: 1.5, fill: "currentColor" },
  { type: "circle", cx: 5, cy: 12, r: 1.5, fill: "currentColor" },
  { type: "circle", cx: 5, cy: 18, r: 1.5, fill: "currentColor" },
  {
    type: "path",
    d: "M10 6h10M10 12h10M10 18h10",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
  },
]);

export const LinkIcon = createIcon([
  {
    type: "path",
    d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  {
    type: "path",
    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
]);

export const UnlinkIcon = createIcon([
  {
    type: "path",
    d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  {
    type: "path",
    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  {
    type: "path",
    d: "M3 3l18 18",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
  },
]);

export const UndoIcon = createIcon([
  {
    type: "path",
    d: "M3 7v6h6",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  {
    type: "path",
    d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-7.7 4.3L3 13",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
]);

export const RedoIcon = createIcon([
  {
    type: "path",
    d: "M21 7v6h-6",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  {
    type: "path",
    d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 7.7 4.3L21 13",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
]);

export const AlignLeftIcon = createIcon([
  {
    type: "path",
    d: "M3 6h18M3 12h12M3 18h18",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
]);

export const AlignCenterIcon = createIcon([
  {
    type: "path",
    d: "M3 6h18M6 12h12M3 18h18",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
]);

export const AlignRightIcon = createIcon([
  {
    type: "path",
    d: "M3 6h18M9 12h12M3 18h18",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
]);

export const AlignJustifyIcon = createIcon([
  {
    type: "path",
    d: "M3 6h18M3 12h18M3 18h18",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
]);
