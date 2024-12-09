Cypress.Commands.add('sendMessage', (message) => {

  cy.request({
    method: 'POST',
    url: '/messages/send',
    body: {
      message: message
    },
    failOnStatusCode: false
  })
    .then((request) => {
      cy.log(JSON.stringify(request))
    })
    .then((response) => {
      cy.log('Send Message Response : ' + JSON.stringify(response))
    });

})

Cypress.Commands.add('clearMessages', () => {

  cy.request({
    method: 'GET',
    url: '/messages',
    failOnStatusCode: false
  })
    .then((request) => {
      cy.log(JSON.stringify(request))
    })
    .then((response) => {
      cy.log('Response Type: ' + typeof response)
      cy.log('GET Message Response : ' + JSON.stringify(response))

      })


})
