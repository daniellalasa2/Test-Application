function req(callback) {
  cy.request({
    method: "GET",
    url: Cypress.env("EXTERNAL_API"),
    headers: {
      "content-type": "application/json"
    },
    params: {}
  }).then(resp => {
    if (resp.status === 200 && resp.body.ok === true) {
      callback(resp);
      return false;
    }
  });
}
context("Search", () => {
  //check total search result count
  describe("Table Info", () => {
    it("Total search result count is correct", () => {
      cy.visit("/listing");
      // https://localhost:3000/listing
      //.resultCount must contains api dada
      req(res => {
        cy.get(".Search .dataInfoTable-section .resultCount").contains(
          `${res.data.meta.total_enteries} Ergebnisse gefunden`
        );
      });
    });
    //check generated table info rows
    it("Generated table info rows are correct", () => {
      req(res => {
        //check if all the generated elements texts are equal to api returned value or not
      });
      cy.get(".Search .dataInfoTable-section table tbody")
        .find("tr")
        .should($tr => {
          expect($tr).to.have.length(res.data.included.length);
        });
    });
  });
});
