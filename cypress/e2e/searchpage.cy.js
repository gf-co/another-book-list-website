// Visit search page
// Check if page name "Search" and page description "Find the book from our database." is visible.
// Check if radio buttons from category.name are visible. (Get from categories.json fixture)

describe("Search Page", () => {
  beforeEach(() => {
    cy.visit("/search");
  });

  it("displays page name and description", () => {
    cy.contains("h1", "Search").should("be.visible");
    cy.contains("p", "Find the book from our database.").should("be.visible");
  });

  it("displays category radio buttons", () => {
    cy.fixture("categories").then((categories) => {
      categories.forEach((category) => {
        cy.contains("label", category.name).should("be.visible");
      });
    });
  });

  // Use clicks a category radio button
  it("displays only items from selected category", () => {
    cy.fixture("categories").then((categories) => {
      cy.fixture("items").then((items) => {
        categories.forEach((category) => {
          // Click on the category radio button
          cy.contains("label", category.name).click();

          const categoryItems = items.filter(
            (item) => item.categoryId === category.id,
          );
          const otherItems = items.filter(
            (item) => item.categoryId !== category.id,
          );

          categoryItems.forEach((item) => {
            cy.contains(item.name).should("be.visible");
            cy.contains(item.description).should("be.visible");
          });

          otherItems.forEach((item) => {
            cy.contains(item.name).should("not.exist");
            cy.contains(item.description).should("not.exist");
          });
        });
      });
    });
  });

  it("displays only items that match the keyword and the category selected", () => {
    // Algorithm:
    // 1. Loop through each category using fixtures
    // 2. Click on the category radio button
    // 3. Type the item name into the search input
    // 4. Click the search button
    // 5. Check if the matching item is visible
    // 6. Check if the non-matching item is not visible
    // 7. Repeat step 2-6 for each category

    cy.fixture("categories").then((categories) => {
      cy.fixture("items").then((items) => {
        categories.forEach((category) => {
          // Click on the category radio button
          cy.contains("label", category.name).click();

          items.forEach((item) => {
            // Type the item name into the search input
            cy.get("[data-cy=input-keyword]").type(item.name);

            // Click the search button
            cy.get("[data-cy=button-search]").click();

            if (item.categoryId === category.id) {
              // Check if the matching item is visible
              cy.contains(item.name).should("be.visible");
              cy.contains(item.description).should("be.visible");
            } else {
              // Check if the non-matching item is not visible
              // @todo - Figure out a more reliable way to check if an element is not visible
              // Use id and description rather than name and description
              // cy.contains(item.name).should("not.exist");
              cy.contains(item.id).should("not.exist");
              cy.contains(item.description).should("not.exist");
            }

            // Clear the search input
            cy.get("[data-cy=input-keyword]").clear();
          });
        });
      });
    });
  });
});
