/* eslint-disable no-undef */
// /** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // preset: "ts-jest",
  roots: ["<rootDir>/dist/"],
  preset: "@shelf/jest-dynamodb",
  testEnvironment: "node",
};
