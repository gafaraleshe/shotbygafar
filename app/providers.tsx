"use client";

import { ThemeProvider } from "next-themes";
import { MotionProvider } from "@/components/motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Dark is the default; light is the original cream cards on black. A
    // visitor's pick is stored in localStorage and applied before paint, so
    // there's no flash.
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionProvider>
        {children}
        {/* The light/dark tab on the right edge, as on gafaraleshe.com. */}
        <ThemeToggle />
      </MotionProvider>
    </ThemeProvider>
  );
}
