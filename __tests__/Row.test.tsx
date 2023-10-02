import Row from "@/components/Row";
import { Item } from "@/data.types";
import items from "@/data/items.json";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const item: Item = items[0];

describe("Row", () => {
  it("renders item name and description", () => {
    render(<Row item={item} />);
    const nameElement = screen.getByText(item.name);
    const descriptionElement = screen.getByText(item.description);
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders link to item details page", () => {
    render(<Row item={item} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/items/${item.id}`);
  });
});
