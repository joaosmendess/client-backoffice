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
  ".form-container": {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    gap: '16px',
    maxWidth: '600px',
    margin: 'auto',
    '@media (max-width: 600px)': {
      padding: '16px',
    },
  },
  ".header-table": {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    gap: '16px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  ".list-item-with-menu": {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    margin: '16px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    flexWrap: 'nowrap',
    '@media (max-width: 600px)': {
      padding: '8px',
    },
  },
  ".truncate": {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  ".dialog-actions": {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '8px 16px',
    gap: '8px',
    '@media (max-width: 600px)': {
      justifyContent: 'center',
    },
  },
  ".circular-progress": {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
});

globalStyles();
