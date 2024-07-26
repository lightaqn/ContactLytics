import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ContactLytics",
  description: "Best Contact Management App on the Web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
