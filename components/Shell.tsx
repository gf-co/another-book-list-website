"use client";

import { ReactNode, useState } from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";
import SidebarToggle from "./SidebarToggle";

type ShellProps = {
  children: ReactNode;
};

export default function Shell({ children }: ShellProps) {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  return (
    <div className="bg-gray-50 antialiased dark:bg-gray-900">
      <div className="px-2 pt-2 xl:hidden">
        <SidebarToggle
          isSidebarOpened={isSidebarOpened}
          setIsSidebarOpened={setIsSidebarOpened}
        />
      </div>
      <Sidebar
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
      />
      <Main>{children}</Main>
    </div>
  );
}
