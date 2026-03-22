import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/img/product/coffee.png", type: "image/png" }],
    shortcut: "/img/product/coffee.png",
    apple: [{ url: "/img/product/coffee.png", type: "image/png" }],
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
