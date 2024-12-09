
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      sendMessage(value: String): Chainable<any>;
    }

    interface Chainable<Subject = any> {
      clearMessages(): Chainable<any>;
    }
  }
}

