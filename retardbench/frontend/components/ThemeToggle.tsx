"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  return (
    <button
      className="rounded-md border px-3 py-2 text-sm"
      onClick={() => {
        setDark((x) => !x);
        document.documentElement.classList.toggle("dark");
      }}
    >
      {dark ? "Light" : "Dark"} mode
    </button>
  );
}
