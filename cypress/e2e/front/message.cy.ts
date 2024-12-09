describe('Message', () => {

  beforeEach(() => {
    cy.clearMessages()
  })

  afterEach(() => {
    cy.clearMessages()
  })

  it("List messages", () => {
    let content = 'alerting_' + new Date().toISOString();
    let key = 'alerting';
    cy.sendMessage(key, content)

    cy.visit('http://localhost:4200/messages')

    cy.get('th').should('have.length', 5);
    cy.get('th').eq(0).should('contain', 'ID');
    cy.get('th').eq(1).should('contain', 'Timestamp');
    cy.get('th').eq(2).should('contain', 'Key');
    cy.get('th').eq(3).should('contain', 'Content');

  })

})
