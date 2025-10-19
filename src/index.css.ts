import { globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
  margin: 0,
  display: "flex",
  placeItems: "center",
  minWidth: "100vw",
  minHeight: "100vh",
  color: "#636363",
  textShadow: "0 0 1px white",
});

globalStyle("#root", {
  maxWidth: "1280px",
  margin: "0 auto",
});

globalStyle("h2", {
  margin: 0,
  fontSize: "8em",
  whiteSpace: "nowrap",
});

globalStyle("h3", {
  margin: 0,
  fontSize: "4em",
  whiteSpace: "nowrap",
});

globalStyle("hr", {
  border: "none",
  height: "1px",
  backgroundColor: "#636363",
});
