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
      return;
    }
    req();
  });
}
context("Table Info", () => {
  cy.visit("/listing");
  var total_enteries = 0;
  var elements = [];
  req(result => {
    total_enteries = result.meta.total_enteries;
    elements = result.included;
  });
  it("Total search result is correct ", () => {
    // https://localhost:3000/listing
    cy.get(".Search .dataInfoTable-section .resultCount")
      .contains(`${total_enteries} Ergebnisse gefunden`)
      // .type() with special character sequences
      .type("{leftarrow}{rightarrow}{uparrow}{downarrow}")
      .type("{del}{selectall}{backspace}")

      // .type() with key modifiers
      .type("{alt}{option}") //these are equivalent
      .type("{ctrl}{control}") //these are equivalent
      .type("{meta}{command}{cmd}") //these are equivalent
      .type("{shift}")

      // Delay each keypress by 0.1 sec
      .type("slow.typing@email.com", { delay: 100 })
      .should("have.value", "slow.typing@email.com");

    cy.get(".action-disabled")
      // Ignore error checking prior to type
      // like whether the input is visible or disabled
      .type("disabled error checking", { force: true })
      .should("have.value", "disabled error checking");
  });
});
