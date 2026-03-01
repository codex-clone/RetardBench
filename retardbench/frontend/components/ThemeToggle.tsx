"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <button
      className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700"
      onClick={() => {
        setDark((x) => !x);
        document.documentElement.classList.toggle("dark");
      }}
      aria-label="Toggle theme"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
