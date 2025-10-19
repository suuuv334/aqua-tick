import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

export const globalTheme = createGlobalTheme(":root", {
  color: {
    base: "#BAE6FF",
    shadow: "#98CEEE",
    deep: "#88B2CB",
  },
  font: {
    color: "#636363",
  },
});

globalStyle("body", {
  margin: 0,
  display: "flex",
  placeItems: "center",
  minWidth: "100vw",
  minHeight: "100vh",
  textShadow: "0 0 1px white",
  userSelect: "none",
  WebkitUserSelect: "none",
  msUserSelect: "none",
  MozUserSelect: "none",
});

globalStyle("#root", {
  maxWidth: "1280px",
  margin: "0 auto",
});

globalStyle("h2", {
  color: globalTheme.font.color,
  margin: 0,
  fontSize: "8em",
  whiteSpace: "nowrap",
});

globalStyle("h3", {
  color: globalTheme.font.color,
  margin: 0,
  fontSize: "4em",
  whiteSpace: "nowrap",
});

globalStyle("hr", {
  border: "none",
  height: "1px",
  backgroundColor: globalTheme.font.color,
});
