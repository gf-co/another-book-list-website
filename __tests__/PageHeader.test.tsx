import PageHeader, { PageHeaderProps } from "@/components/PageHeader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockProps: PageHeaderProps = {
  icon: "home",
  name: "Home",
  description: "This is the home page",
};

describe("PageHeader", () => {
  it("renders the icon, name, and description", () => {
    render(<PageHeader {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });
});
