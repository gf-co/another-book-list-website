"use client";

import { ActiveFilters } from "@/app/search/page";
import { Category } from "@/data.types";

type FiltersProps = {
  categories: Category[];
  activeFilters: ActiveFilters;
  setActiveFilters: (filters: ActiveFilters) => void;
};

const Filters = ({
  categories,
  activeFilters,
  setActiveFilters,
}: FiltersProps) => {
  const hasNoActiveFilters = !activeFilters.category && !activeFilters.keyword;

  const handleClearFilters = () => {
    const newFilters = { category: "", keyword: "" };
    setActiveFilters(newFilters);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFilters = { ...activeFilters, [name]: value };

    // If category is empty, set it to the first category
    if (!newFilters.category) {
      newFilters.category = categories[0].id;
    }

    setActiveFilters(newFilters);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If submit button is clicked, just pass the current filters already set by handleFilterChange again.
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get("keyword") as string;
    let category = formData.get("category") as string;
    const newFilters = { keyword, category };

    setActiveFilters(newFilters);
  };

  return (
    <form className="flex max-w-lg flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-nowrap gap-2">
        <input
          type="text"
          name="keyword"
          value={activeFilters.keyword}
          onChange={handleFilterChange}
          className="flex-1 rounded-lg border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search with keyword in title and description"
          data-cy="input-keyword"
        />

        <button
          type="submit"
          className="ml-auto grid place-items-center rounded-lg border border-blue-700 bg-blue-600 p-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          data-cy="button-search"
        >
          Search
        </button>
      </div>
      <div className="flex flex-nowrap gap-2">
        <div className="inline-flex rounded-md shadow-sm">
          {categories.map((category, index) => {
            const isFirst = index === 0;
            const isLast = index === categories.length - 1;

            return (
              <label
                key={index}
                className={`
            ${isFirst ? "rounded-l-lg" : ""}
            ${isLast ? "rounded-r-lg" : ""} 
            ${
              activeFilters.category === category.id
                ? "bg-gray-600"
                : "bg-gray-700"
            }
            cursor-pointer border border-gray-600 px-4 py-2 text-xs text-white hover:bg-gray-600 focus:z-10 focus:text-white focus:ring-2 focus:ring-blue-500`}
              >
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={activeFilters.category === category.id}
                  onChange={handleFilterChange}
                  className="hidden"
                />
                {category.name}
              </label>
            );
          })}
        </div>
        {!hasNoActiveFilters && (
          <div className="inline-flex rounded-md shadow-sm">
            <button
              key="clear"
              className="cursor-pointer rounded-l-lg rounded-r-lg border border-gray-600 px-4 py-2 text-xs text-white hover:bg-gray-600 focus:z-10 focus:text-white focus:ring-2 focus:ring-blue-500"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Filters;
