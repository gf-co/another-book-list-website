import PageHeader from "@/components/PageHeader";
import Row from "@/components/Row";
import categories from "@/data/categories.json";
import items from "@/data/items.json";
import { PageProps } from "@/lib/server.types";
import { notFound } from "next/navigation";

export default function ItemsPage({ params }: PageProps) {
  const category = categories.find(
    (category) => category.id === params.categoryId,
  );

  if (!category) {
    notFound();
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <PageHeader
        name={category.name}
        description={category.description}
        icon={category.icon}
      />

      {items.map((item) => (
        <Row key={item.id} item={item} />
      ))}
    </div>
  );
}
