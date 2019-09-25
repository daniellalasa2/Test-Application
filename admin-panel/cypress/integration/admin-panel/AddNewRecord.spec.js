context("Add new record", () => {
  //check total search result count
  describe("Page Load", () => {
    it("Page loaded successfuly and elements now are mounted", () => {
      cy.visit("/addnewrecord");
      //getting button from section
      cy.get(".addNewRecord-section .icon-wrapper");
    });
  });
});
