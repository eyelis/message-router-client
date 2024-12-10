import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8080/api/",
  },
  env: {
    homeUrl: 'http://localhost:4200/',
    test_data_prefix: 'test_data_'
  },
});
