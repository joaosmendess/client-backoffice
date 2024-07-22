import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: "#0070f3",
      secondary: "#1A1A1A",
    },
  },
});

const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  body: {
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "$background",
    color: "$text",
    lineHeight: 1.5,
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
  "html, body, #root": {
    height: "100%",
  },
});

globalStyles();
