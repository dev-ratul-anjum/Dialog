import "./globals.css";
import { Ubuntu } from "next/font/google";
import Providers from "@/components/Providers";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
