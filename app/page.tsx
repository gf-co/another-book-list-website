import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import categories from "@/data/categories.json";
import items from "@/data/items.json";
import Link from "next/link";

export default function HomePage() {
  const pinned = items.filter((item) => item.pinned);
  const itemsPerCategory = Object.values(categories).map((category) => {
    const itemsInCategory = items.filter(
      (item) => item.categoryId === category.id,
    );
    return { category, items: itemsInCategory };
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        name="Home"
        description="Another book list website, but this one is mine."
        icon="home"
      />

      {!!pinned.length && (
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Pinned</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5">
            {pinned.map((item) => (
              <Card key={`pinned-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      )}

      {itemsPerCategory.map(({ category, items }) => {
        if (!!items.length)
          return (
            <div key={category.id} className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {category.description}
                  </p>
                </div>
                <Link href={`/categories/${category.id}/items`}>
                  <p className="text-sm text-white hover:underline">Show all</p>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5">
                {items.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
      })}
    </div>
  );
}
