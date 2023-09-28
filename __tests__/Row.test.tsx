import Row from "@/components/Row";
import { Item } from "@/data.types";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockItem: Item = {
  id: "1",
  name: "Test Item",
  description: "This is a test item",
  imageUrl: "https://example.com/test.jpg",
  pinned: false,
  categoryId: "1",
};

describe("Row", () => {
  it("renders item name and description", () => {
    render(<Row item={mockItem} />);
    const nameElement = screen.getByText(mockItem.name);
    const descriptionElement = screen.getByText(mockItem.description);
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders link to item details page", () => {
    render(<Row item={mockItem} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/items/${mockItem.id}`);
  });
});
