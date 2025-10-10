import { globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
  margin: 0,
  display: "flex",
  placeItems: "center",
  minWidth: "100wh",
  minHeight: "100vh",
});

globalStyle("#root", {
  maxWidth: "1280px",
  margin: "0 auto",
});
