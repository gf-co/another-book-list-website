// - For each category, visit page using category.id - "/categories/:id/items"
//     - Check if page name <category.name> and page description <category.description> is visible.
//     - Filter items by category.id
//     - Check if items are visible on the specific category page.
//     - Check if other items are not visible on other category pages.

describe("Items Page", () => {
  beforeEach(() => {
    cy.fixture("categories.json").as("categories");
    cy.fixture("items.json").as("items");
  });

  it("should display the correct category page and items", function () {
    cy.get("@categories").each((category) => {
      cy.get("@items").then((items) => {
        const categoryItems = items.filter(
          (item) => item.categoryId === category.id,
        );
        const otherItems = items.filter(
          (item) => item.categoryId !== category.id,
        );

        cy.visit(`/categories/${category.id}/items`);

        cy.contains(category.name);
        cy.contains(category.description);

        categoryItems.forEach((item) => {
          cy.contains(item.name);
          cy.contains(item.description);
          cy.get(`[alt="${item.name}"]`).should("be.visible");
        });

        otherItems.forEach((item) => {
          cy.contains(item.name).should("not.exist");
          cy.contains(item.description).should("not.exist");
          cy.get(`[alt="${item.name}"]`).should("not.exist");
        });
      });
    });
  });
});
