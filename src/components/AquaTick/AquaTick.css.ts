import { style } from "@vanilla-extract/css";
export const aquaTickContent = style({
  position: "relative",
  // SVGの z-index: 1 よりも高く設定
  zIndex: 10,
});
export const aquaTick = style({
  display: "flex",
  position: "relative",
  width: "fit-content",
  height: "fit-content",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
});

export const aquaTickSvg = style({
  zIndex: 1,
  width: "calc(100% * 2)",
  height: "calc(100% * 2)",
  position: "absolute",
});

export const aquaTickPath = style({
  transform: "translate(100px, 100px)",
  fill: "#b9a2d8ff",
  strokeWidth: "2px",
});

export const aquaTickMask = style({
  transform: "translate(100px, 100px)",
  fill: "white",
});
