// __mocks__/nanoid.js
module.exports = {
  nanoid: () => "test-id-123",
  customAlphabet: () => () => "test-custom-id",
};
