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
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFilters = { ...activeFilters, [name]: value };
    setActiveFilters(newFilters);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get("keyword") as string;
    const category = formData.get("category") as string;
    const newFilters = { keyword, category };

    setActiveFilters(newFilters);
  };

  return (
    <form className="flex max-w-lg flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-nowrap gap-2">
        <input
          type="text"
          name="keyword"
          defaultValue={activeFilters.keyword}
          className="flex-1 rounded-lg border border-gray-600 bg-gray-700 p-3 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search with keyword in title and description"
        />

        <button
          type="submit"
          className="ml-auto grid place-items-center rounded-lg border border-blue-700 bg-blue-600 p-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      <div className="inline-flex rounded-md shadow-sm">
        <label
          className={`
        ${activeFilters.category === "all" ? "bg-gray-600" : "bg-gray-700"}
       cursor-pointer rounded-l-lg border border-gray-600 px-4 py-2 text-xs text-white hover:bg-gray-600 focus:z-10 focus:text-white focus:ring-2 focus:ring-blue-500
        `}
        >
          <input
            type="radio"
            name="category"
            value="all"
            className="hidden"
            checked={activeFilters.category === "all"}
            onChange={handleFilterChange}
          />
          All
        </label>

        {categories.map((category, index) => {
          const isLast = index === categories.length - 1;

          return (
            <label
              key={index}
              className={`
            ${isLast ? "rounded-r-md" : ""} 
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
    </form>
  );
};

export default Filters;
