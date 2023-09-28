"use client";

import categories from "@/data/categories.json";
import socials from "@/data/socials.json";
import SidebarItem from "./SidebarItem";
import SidebarToggle from "./SidebarToggle";
import Socials from "./Socials";

interface SidebarProps {
  isSidebarOpened: boolean;
  setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  isSidebarOpened,
  setIsSidebarOpened,
}: SidebarProps) {
  return (
    <nav
      className={`
      fixed left-0 top-0 z-50 h-screen w-64 -translate-x-full border-r border-gray-700 bg-gray-800 p-4 transition-transform xl:translate-x-0
      ${isSidebarOpened ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex justify-end xl:hidden">
        <SidebarToggle
          isSidebarOpened={isSidebarOpened}
          setIsSidebarOpened={setIsSidebarOpened}
        />
      </div>

      <ul className="flex flex-col gap-2">
        <li>
          <SidebarItem name="Home" url={"/"} icon="home" />
        </li>
        <li>
          <SidebarItem name="Search" url={"/search"} icon="search" />
        </li>
      </ul>

      <hr className="my-6 border-t border-gray-700" />

      <ul className="flex flex-col gap-2">
        {categories.map((category) => (
          <li key={category.id}>
            <SidebarItem
              name={category.name}
              url={`/categories/${category.id}/items`}
              icon="book"
            />
          </li>
        ))}
      </ul>

      <div className="absolute bottom-0 left-0 w-full p-4">
        <Socials socials={socials} />
      </div>
    </nav>
  );
}
