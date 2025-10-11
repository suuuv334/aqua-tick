import { style } from "@vanilla-extract/css";
export const aquaContent = style({
  position: "relative",
  // SVGの z-index: 1 よりも高く設定
  zIndex: 10,
});
export const aquaContainer = style({
  display: "flex",
  position: "relative",
  width: "fit-content",
  height: "fit-",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
});

export const aquaSvg = style({
  zIndex: 1,
  width: "calc(100% * 2)",
  height: "calc(100% * 2)",
  position: "absolute",
});

export const aquaPath = style({
  transform: "translate(100px, 100px)",
  fill: "#b9a2d8ff",
  strokeWidth: "2px",
});
export const aquaMask = style({
  transform: "translate(100px, 100px)",
  fill: "white",
});
