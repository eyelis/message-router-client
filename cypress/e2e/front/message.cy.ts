import {format} from 'date-fns';

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

    cy.intercept('GET', 'http://localhost:4200/api/messages').as('messages');

    cy.visit('http://localhost:4200/messages')

    cy.wait('@messages').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const expectedMessages = interception.response.body;

      cy.get('[data-testid="message-table"]').should('exist');

      cy.get('[data-testid="message-table"] tr th').should('have.length', 5);
      cy.get('[data-testid="message-table"] tr th').eq(0).should('contain', 'ID');
      cy.get('[data-testid="message-table"] tr th').eq(1).should('contain', 'Timestamp');
      cy.get('[data-testid="message-table"] tr th').eq(2).should('contain', 'Key');
      cy.get('[data-testid="message-table"] tr th').eq(3).should('contain', 'Content');

      expectedMessages
        .filter((item) => item.content.startsWith(Cypress.env('test_data_prefix')))
        .map((item) => {
          cy.log('item : ' + item)
          cy.get('[data-testid="message-table"] tr').each(($row, index) => {
            if (index > 0) { // not header row => data row
              cy.wrap($row).within(() => {
                cy.get('td')
                  .eq(3)
                  .invoke('text')
                  .then((cellContent) => {
                    if (cellContent.trim().startsWith(Cypress.env('test_data_prefix'))) {
                      cy.get('td').eq(0).should('contain', item.id);
                      cy.get('td').eq(1).should('contain', format(new Date(item.timestamp), 'yyyy-MM-dd HH:mm:ss.SSS'));
                      cy.get('td').eq(2).should('contain', item.key);
                      cy.get('td').eq(3).should('contain', item.content);
                    }
                  });
              });
            }
          });
        });
    });
  })
})
