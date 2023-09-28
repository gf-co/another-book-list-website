import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Filters from "../components/Filters";

const categories = [
  {
    id: "1",
    name: "Category 1",
    description: "Description 1",
    icon: "Icon 1",
  },
  {
    id: "2",
    name: "Category 2",
    description: "Description 2",
    icon: "Icon 2",
  },
];

describe("Filters", () => {
  it("renders correctly", () => {
    render(
      <Filters
        categories={categories}
        activeFilters={{ category: "all", keyword: "" }}
        setActiveFilters={() => {}}
      />,
    );

    expect(
      screen.getByPlaceholderText(
        "Search with keyword in title and description",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("updates activeFilters when form is submitted", () => {
    const setActiveFilters = jest.fn();
    render(
      <Filters
        categories={categories}
        activeFilters={{ category: "all", keyword: "" }}
        setActiveFilters={setActiveFilters}
      />,
    );

    const keywordInput = screen.getByPlaceholderText(
      "Search with keyword in title and description",
    );
    const searchButton = screen.getByText("Search");

    fireEvent.change(keywordInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    expect(setActiveFilters).toHaveBeenCalledWith({
      category: "all",
      keyword: "test",
    });
  });

  it("updates activeFilters when category is selected", () => {
    const setActiveFilters = jest.fn();
    render(
      <Filters
        categories={categories}
        activeFilters={{ category: "all", keyword: "" }}
        setActiveFilters={setActiveFilters}
      />,
    );

    const category1 = screen.getByText("Category 1");
    const category2 = screen.getByText("Category 2");

    fireEvent.click(category1);

    expect(setActiveFilters).toHaveBeenCalledWith({
      category: "1",
      keyword: "",
    });

    fireEvent.click(category2);

    expect(setActiveFilters).toHaveBeenCalledWith({
      category: "2",
      keyword: "",
    });
  });
});
