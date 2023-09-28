import SidebarItem from "@/components/SidebarItem";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockProps = {
  name: "Home",
  url: "/",
  icon: "home",
};

describe("SidebarItem", () => {
  it("renders the name", () => {
    render(<SidebarItem {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it("renders a link with the correct href", () => {
    render(<SidebarItem {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", mockProps.url);
  });
});
