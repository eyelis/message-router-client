
Cypress.Commands.add('sendMessage', (key, message) => {

  cy.request({
    method: 'POST',
    url: '/messages/send',
    body: {
      key : key,
      message: message
    },
    failOnStatusCode: false
  })
    .then((request) => {
     // cy.log(JSON.stringify(request))
    })
    .then((response) => {
      //cy.log('Send Message Response : ' + JSON.stringify(response))
    });

})

Cypress.Commands.add('clearMessages', () => {

  cy.request({
    method: 'GET',
    url: '/messages',
    failOnStatusCode: false
  })
    .then((request) => {
     // cy.log(JSON.stringify(request))
    })
    .then((response) => {
     // cy.log('GET Message Response : ' + JSON.stringify(response))
      response.body.map(message => {
        cy.log("delete message line : " + message.id)
        cy.request(
          {
            method: 'DELETE',
            url : `/messages/${message.id}`,
            failOnStatusCode: false
          }
        ) .then((response) => {
          //cy.log('Message Deleted : ' +  JSON.stringify(response))
        });
      })

    })


})
