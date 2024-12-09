describe('Message', () => {

  beforeEach(() => {
    cy.clearMessages()
  })

  afterEach(() => {
    cy.clearMessages()
  })

  it("API List all messages", () => {
   // cy.intercept('POST', 'http://localhost:8080/api/messages/send').as('send')

    let content = 'alerting_' + new Date().toISOString();
    let key = 'alerting';
    cy.sendMessage(key, content)
   // cy.sendMessage('notification', 'notification_' + new Date().toISOString())

    //cy.wait('@send')

    cy.request('GET', '/messages')
      .its('body')
      .should('be.an', 'array')
      .and('have.length', 1)
      .each((item) => {
        cy.log('item : ' + item)
        expect(item).to.have.all.keys('id', 'key', 'content', 'timestamp');
        expect(item.id).to.be.a('number').and.not.to.be.null;
        expect(item.key).to.eq(key);
        expect(item.content).to.eq(content);
        expect(item.timestamp).to.be.a('string').and.not.to.be.empty;
      })

  })

})
