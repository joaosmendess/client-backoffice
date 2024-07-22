import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  body: {
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#f4f6f8",
    color: "#000000",
    lineHeight: 1.5,
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  "html, body, #root": {
    height: "100%",
  },
});

globalStyles();
