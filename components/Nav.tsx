"use client";

import { useTheme } from "next-themes";

export const Nav = () => {
  const { theme } = useTheme();

  return (
    <div
      className={
        "fixed top-0 left-0 right-0 h-16 px-6 flex items-center justify-between z-50 glass-effect border-b border-white/5"
      }
    >
      {/* VEE Logo */}
      <div className="flex items-center">
        <h1 className="font-vee text-4xl text-vee-red">VEE</h1>
      </div>
    </div>
  );
};
