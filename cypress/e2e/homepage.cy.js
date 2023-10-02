// Visit homepage "/"
// Check if page name "Home" and page description "Another book list website, but this one is mine." is visible.
// Check if category "Fiction" is visible.
// Check if category "Non-fiction" is visible.
// Check if category "Educational" is visible.

function testHomePage(viewport) {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(viewport);
  });

  it("displays the correct page name and description", () => {
    cy.contains("h1", "Home");
    cy.contains("p", "Another book list website, but this one is mine.");
  });

  // Load categories from fixtures and loop through each category to check if it is visible.
  it("displays all categories", () => {
    cy.fixture("categories.json").then((categories) => {
      categories.forEach((category) => {
        cy.contains("h2", category.name);
      });
    });
  });

  // Load items from fixtures and loop through each item to check if it is visible.
  it("displays all items", () => {
    cy.fixture("items.json").then((items) => {
      items.forEach((item) => {
        cy.contains("h3", item.name);
        cy.contains("p", item.description);
        cy.get(`[alt="${item.name}"]`).should("be.visible");
      });
    });
  });
}

describe("Home Page", () => {
  describe("Home Page Desktop", () => {
    testHomePage("macbook-13");
  });

  describe("Home Page Tablet", () => {
    testHomePage("ipad-2");
  });

  describe("Home Page Mobile", () => {
    testHomePage("iphone-5");
  });
});
