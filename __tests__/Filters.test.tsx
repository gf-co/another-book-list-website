import { ActiveFilters } from "@/app/search/page";
import categories from "@/data/categories.json";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Filters from "../components/Filters";

describe("Filters", () => {
  it("renders correctly", () => {
    render(
      <Filters
        categories={categories}
        activeFilters={categories[0] as unknown as activefilters}
        setActiveFilters={() => {}}
      />,
    );

    expect(
      screen.getByPlaceholderText(
        "Search with keyword in title and description",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it("updates activeFilters when form is submitted", () => {
    const setActiveFilters = jest.fn();
    render(
      <Filters
        categories={categories}
        activeFilters={categories[0] as unknown as activefilters}
        setActiveFilters={setActiveFilters}
      />,
    );

    const keywordInput = screen.getByPlaceholderText(
      "Search with keyword in title and description",
    );
    const searchButton = screen.getByText("Search");

    fireEvent.change(keywordInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    expect(setActiveFilters).toHaveBeenCalledWith(
      categories[0] as unknown as ActiveFilters,
    );
  });

  it("updates activeFilters when category is selected", () => {
    const setActiveFilters = jest.fn();
    render(
      <Filters
        categories={categories}
        activeFilters={categories[0] as unknown as activefilters}
        setActiveFilters={setActiveFilters}
      />,
    );

    categories.forEach((category) => {
      const categoryElement = screen.getByText(category.name);
      fireEvent.click(categoryElement);
      expect(setActiveFilters).toHaveBeenCalledWith({
        category: category.id,
        keyword: "",
      });
    });
  });
});
