// src/components/WavyText.css.ts
import { style } from "@vanilla-extract/css";
export const baseText = style({
  fontSize: "8em",
  whiteSpace: "nowrap", // 改行を防ぐ
});

export const textStroke = style([
  baseText,
  {
    color: "transparent",
    WebkitTextStroke: "2px #8338ec",
    zIndex: 10, // 手前に表示
    position: "absolute",
  },
]);

export const textAnimated = style([
  baseText,
  {
    color: "#362350ff",
    zIndex: 20, // 最も手前に表示
  },
]);

export const content = style({
  width: "fit-content",
});
