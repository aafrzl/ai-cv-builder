import type { Metadata } from "next";
import { Urbanist, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/context/query-provider";
import { Toaster } from "@/components/ui/toaster";

const urbanist = Urbanist({ subsets: ["latin"] });
const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open_sans",
});

export const metadata: Metadata = {
  title: "CVForgeAI",
  description: "Build your resume powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased bg-background",
          urbanist.className,
          open_sans.variable
        )}
      >
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
