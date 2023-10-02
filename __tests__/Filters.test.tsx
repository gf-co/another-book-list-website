import { ActiveFilters } from "@/app/search/page";
import categories from "@/data/categories.json";
import items from "@/data/items.json";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Filters from "../components/Filters";

describe("Filters", () => {
  const noFilter: ActiveFilters = { category: "", keyword: "" };
  const setActiveFilters = jest.fn();

  beforeEach(() => {
    setActiveFilters.mockClear();
  });

  it("renders correctly", () => {
    render(
      <Filters
        categories={categories}
        activeFilters={noFilter}
        setActiveFilters={setActiveFilters}
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
    render(
      <Filters
        categories={categories}
        activeFilters={noFilter}
        setActiveFilters={setActiveFilters}
      />,
    );

    const keywordInput = screen.getByPlaceholderText(
      "Search with keyword in title and description",
    );
    const searchButton = screen.getByText("Search");

    fireEvent.change(keywordInput, { target: { value: items[0].name } });
    fireEvent.click(searchButton);

    expect(setActiveFilters).toHaveBeenCalledWith({
      category: items[0].categoryId,
      keyword: items[0].name,
    });
  });

  it("updates activeFilters when category is selected", () => {
    render(
      <Filters
        categories={categories}
        activeFilters={noFilter}
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
