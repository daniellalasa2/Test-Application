const reqOptions = {
  method: "GET",
  url: Cypress.env("EXTERNAL_API"),
  headers: {
    "content-type": "application/json"
  }
};
context("Search", () => {
  describe("Page Load", () => {
    it("Component loaded successfuly and default search result displayed", () => {
      cy.visit("/listing");
      cy.contains("Admin Tool");
      cy.url().should("include", "?search=&page[size]=10");
    });
  });
  describe("Search flow", () => {
    beforeEach(function() {
      //visit the page every each test units
      cy.visit("/listing");
    });
    it("Search box type behaviour is accurate and the result was filled successfuly into table", () => {
      cy.get(".searchField-box .searchField")
        .type("p")
        .should("have.value", "p");
      cy.request({ qs: { search: "p", "page[size]": "10" }, ...reqOptions })
        .its("body")
        .as("searchResult");
      cy.get("@searchResult").then(resp => {
        if (resp.included) {
          const api_length = resp.included.length;
          const type = resp.included[0].type;
          const label = resp.included[0].attributes.label;
          cy.log(api_length);
          cy.get(".Search .dataInfoTable-section table tbody tr").as("rows");
          cy.get("@rows").should("have.length", api_length);
          cy.get("@rows").find(`td.${type}`);
          cy.get("@rows")
            .find("td.name")
            .contains(label);
        }
      });
    });
    it("Url updated based on user search phrase", () => {
      cy.get(".searchField-box .searchField").type("per");
      cy.url().should("include", "?search=per");
    });
    // it("Pagination elements generated sucessfuly after search", () => {
    //   cy.visit("/listing");
    //   cy.get(".searchField-box .searchField").type("per");

    // });
  });

  //check total search result count
  describe("Table Info", () => {
    it("table info rows load successfuly", () => {
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
