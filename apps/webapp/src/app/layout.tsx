import type { Metadata, Viewport } from "next";

import { cn } from "@app/ui";

import "~/app/globals.css";

export const metadata: Metadata = {};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
        )}
      >
        {props.children}
        {/*<ThemeProvider attribute="class" defaultTheme="system" enableSystem>*/}
        {/*  {props.children}*/}
        {/*  <div className="absolute bottom-4 right-4">*/}
        {/*    <ThemeToggle />*/}
        {/*  </div>*/}
        {/*  <Toaster />*/}
        {/*</ThemeProvider>*/}
      </body>
    </html>
  );
}
