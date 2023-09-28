"use client";

import Filters from "@/components/Filters";
import PageHeader from "@/components/PageHeader";
import Row from "@/components/Row";
import Suggestions from "@/components/Suggestions";
import { Item } from "@/data.types";
import categories from "@/data/categories.json";
import itemsData from "@/data/items.json";
import suggestions from "@/data/suggestions.json";
import { useEffect, useState } from "react";

export type ActiveFilters = {
  category: string;
  keyword: string;
};

export default function SearchPage() {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    category: "all",
    keyword: "",
  });
  const [items, setItems] = useState<Item[]>([]);

  // Every time active filters changes, fetch data
  useEffect(() => {
    const filteredItems = itemsData.filter((item) => {
      const categoryMatch =
        activeFilters.category === "all" ||
        item.categoryId === activeFilters.category;
      const keywordMatch =
        !activeFilters.keyword ||
        item.name.toLowerCase().includes(activeFilters.keyword.toLowerCase());
      return categoryMatch && keywordMatch;
    });
    setItems(filteredItems);
  }, [activeFilters]);

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <PageHeader
        name="Search"
        description="Find the book from our database."
        icon="search"
      />
      <Filters
        categories={categories}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      {/* Show suggestions if haven't typed keyword yet */}
      {!items.length && (
        <Suggestions
          suggestions={suggestions}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      )}

      {/* Display the items for the keyword */}
      {!!items.length && items.map((item) => <Row key={item.id} item={item} />)}

      {/* Display a message when no items found for keyword */}
      {/* if keyword and activeFilter exists or not equal to 'all'
          No items found for keyword "code" and category "Educationals".
      if only keyword exists
          No items found for keyword "code"
      if only category exists
          No items found category "Educationals". */}
      {!items.length && (
        <p className="text-sm text-gray-400">
          No items found for{" "}
          {activeFilters.keyword && activeFilters.category !== "all"
            ? `keyword "${
                activeFilters.keyword
              }" and category "${categories.find(
                (category) => category.id === activeFilters.category,
              )?.name}"`
            : activeFilters.keyword
            ? `keyword "${activeFilters.keyword}"`
            : `category "${categories.find(
                (category) => category.id === activeFilters.category,
              )?.name}"`}
          .
        </p>
      )}
    </div>
  );
}
