"use client";

/**
 * A button component that toggles between light and dark themes.
 * @returns {JSX.Element} A button element that toggles between light and dark themes.
 */

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeButton(): JSX.Element | null {
  const { resolvedTheme, setTheme } = useTheme(); // get the theme and setTheme function from the context

  const [mounted, setMounted] = useState(false); // variable to check if the component is mounted

  useEffect(() => {
    setMounted(true);
  }, []); // set the mounted variable to true when the component is mounted

  if (!mounted) return null; // if the component is not mounted, return null

  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      type="button"
    >
      {resolvedTheme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
