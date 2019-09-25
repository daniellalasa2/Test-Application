const reqOptions = {
  method: "GET",
  url: Cypress.env("EXTERNAL_API"),
  headers: {
    "content-type": "application/json"
  },
  params: {}
};
context("Search", () => {
  //check total search result count
  describe("Table Info", () => {
    it("Total search result count is correct", () => {
      cy.visit("/listing");
      // https://localhost:3000/listing
      //.resultCount must contains api dada
      cy.request(reqOptions).as("getList");
      cy.get("@getList").should($res => {
        //   cy.get(".Search .dataInfoTable-section .resultCount").contains();
      });
    });
    //check generated table info rows
    it("Generated table info rows are correct", () => {
      cy.visit("/listing");

      // cy.get("@getRows").should($res => {
      cy.get(".Search .dataInfoTable-section table tbody tr").then(tr => {
        const listingCount = Cypress.$(tr).length;
        cy.request(reqOptions)
          .its("body.included")
          .should($i => {
            expect($i).to.have.length(listingCount);
          });
      });
      //   cy.get(".Search .dataInfoTable-section .resultCount").contains();
      //   });
    });
  });
});
