import { style } from "@vanilla-extract/css";

export const aquaContainerClass = style({
  display: "flex",
  position: "relative",
  width: "fit-content",
  height: "fit-content",
  justifyContent: "center",
  alignItems: "center",
});

export const aquaSvgClass = style({
  width: "calc(100% + 100%)",
  height: "calc(100% + 100%)",
  position: "absolute",
});

export const aquaPathClass = style({
  transform: "translate(100px, 100px)",
  fill: "#b9a2d8ff",
});
