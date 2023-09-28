import { Social } from "@/data.types";
import { icons } from "@/data/icons";
import Link from "next/link";

type SocialsProps = {
  socials: Social[];
};

export default function Socials({ socials }: SocialsProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-white">
      <span>Socials</span>
      <span>•</span>
      <ul className="flex gap-1">
        {socials.map((social) => (
          <li
            key={social.id}
            className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:ring-gray-700"
          >
            <Link href={social.url} target="_blank" rel="noopener noreferrer">
              {icons[social.icon]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
