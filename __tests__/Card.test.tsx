import Card from "@/components/Card";
import { Item } from "@/data.types";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import items from "@/data/items.json"

const item: Item = items[0];

describe("Card", () => {
  it("renders the item name and description", () => {
    render(<Card item={item} />);
    const nameElement = screen.getByText(item.name);
    const descriptionElement = screen.getByText(item.description);
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders a link to the item details page", () => {
    render(<Card item={item} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/items/${item.id}`);
  });
});
