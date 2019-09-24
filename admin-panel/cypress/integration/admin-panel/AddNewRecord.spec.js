context("Add new record", () => {
  //check total search result count
  describe("Page Load", () => {
    it("Page loaded successfuly and elements now are mounted", () => {
      cy.visit("/addnewrecord");
      cy.get(".addNewRecord-section .icon-wrapper");
      // https://localhost:3000/listing
      //getting button from section
    });
  });
});
