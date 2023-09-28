import { icons } from "@/data/icons";
import Link from "next/link";

type SidebarItemProps = {
  name: string;
  url: string;
  icon: string;
}

export default function SidebarItem({ name, url, icon }: SidebarItemProps) {
  return (
    <Link
      href={url}
      className="flex items-center rounded-lg p-2 text-sm text-white transition duration-75 hover:bg-gray-700"
    >
      {icons[icon]}
      <span className="ml-4">{name}</span>
    </Link>
  );
}
