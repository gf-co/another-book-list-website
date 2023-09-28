import Card from "@/components/Card";
import { Item } from "@/data.types";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockItem: Item = {
  id: "1",
  name: "Test Item",
  description: "This is a test item",
  imageUrl: "https://example.com/image.jpg",
  pinned: false,
  categoryId: "1",
};

describe("Card", () => {
  it("renders the item name and description", () => {
    render(<Card item={mockItem} />);
    const nameElement = screen.getByText(mockItem.name);
    const descriptionElement = screen.getByText(mockItem.description);
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders a link to the item details page", () => {
    render(<Card item={mockItem} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/items/${mockItem.id}`);
  });
});
