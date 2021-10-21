/**
 * This is used to configure the Relay compiler.
 * This tells Relay where our source code is, what language to generate code for,
 * and where our GraphQL schema lives.
 *
 * For details on how to set this up, see the Relay website:
 * https://relay.dev/docs/getting-started/installation-and-setup/#set-up-relay-compiler
 */
module.exports = {
  language: "typescript",
  src: "./src",
  schema: "./schema.graphql",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
};
