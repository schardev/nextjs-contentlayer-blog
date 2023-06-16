import localFont from "next/font/local";

export const fontSans = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../public/fonts/Biotif-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/Biotif-RegularItalic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "../public/fonts/Biotif-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/Biotif-MediumItalic.woff2",
      style: "italic",
      weight: "500",
    },
    {
      path: "../public/fonts/Biotif-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/fonts/Biotif-BoldItalic.woff2",
      style: "italic",
      weight: "700",
    },
  ],
});
