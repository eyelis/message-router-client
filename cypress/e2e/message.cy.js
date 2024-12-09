describe('Message', () => {

  beforeEach(() => {
    cy.clearMessages()
  })

  it("API List all messages", () => {
    cy.sendMessage('message_' + new Date().toISOString())

    cy.request({
      method: 'GET',
      url: '/messages',
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(200);
      });

  })

  it("List all messages", () => {

    cy.intercept('GET', 'http://localhost:8080/messages').as('messages')

    cy.visit('http://localhost:4200/messages')

    cy.get('button[routerlink="/messages"]')
      .should("be.visible")
      .click()

    cy.wait('@messages')

    cy.get('mat-table mat-row').should('have.length', 1);

    cy.get('mat-table mat-row')
      .eq(0)
      .find('mat-cell')
      .eq(0)
      .should('match', /^[0-9]+$/);

    cy.get('mat-table mat-row')
      .eq(0)
      .find('mat-cell')
      .eq(1)
      .should('match', /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/ );

    cy.get('mat-table mat-row')
      .eq(0)
      .find('mat-cell')
      .eq(2)
      .should('contain.text', 'message');

  })
})
