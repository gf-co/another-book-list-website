import { Item } from "@/data.types";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  item: Item;
};

export default function Card({ item }: CardProps) {
  return (
    <Link href={`/items/${item.id}`}>
      <div
        key={item.id}
        className="flex h-full w-full flex-col rounded-lg border border-gray-700 bg-gray-800 p-4 shadow transition duration-300 ease-in-out hover:bg-gray-700"
      >
        <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
          <Image
            src={item.imageUrl}
            fill
            alt={item.name}
            object-fit="cover"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-grow flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="line-clamp-2 text-lg font-bold text-white">
              {item.name}
            </h3>
            <p className="line-clamp-3 text-sm text-gray-400">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
