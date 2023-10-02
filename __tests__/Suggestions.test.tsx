import { ActiveFilters } from "@/app/search/page";
import Suggestions from "@/components/Suggestions";
import suggestions from "@/data/suggestions.json";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Suggestions", () => {
  const noFilter: ActiveFilters = { category: "", keyword: "" };
  const setActiveFilters = jest.fn();

  test("renders the top searches heading", () => {
    render(
      <Suggestions
        suggestions={suggestions}
        activeFilters={noFilter}
        setActiveFilters={setActiveFilters}
      />,
    );
    const heading = screen.getByText("Top searches");
    expect(heading).toBeInTheDocument();
  });

  test("renders a list of suggestions", () => {
    render(
      <Suggestions
        suggestions={suggestions}
        activeFilters={noFilter}
        setActiveFilters={setActiveFilters}
      />,
    );
    const suggestionItems = screen.getAllByRole("listitem");
    expect(suggestionItems.length).toBe(suggestions.length);

    suggestionItems.forEach((item, index) => {
      expect(item).toHaveTextContent(suggestions[index].keyword);
    });
  });
});
