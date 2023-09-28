"use client";

import { arrowLeftToggle } from "@/data/icons";

interface SidebarToggleProps {
  isSidebarOpened: boolean;
  setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarToggle({
  isSidebarOpened,
  setIsSidebarOpened,
}: SidebarToggleProps) {
  return (
    <button
      className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:ring-gray-700"
      onClick={() => setIsSidebarOpened(!isSidebarOpened)}
    >
      {arrowLeftToggle}
    </button>
  );
}
