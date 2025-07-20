const { transform } = require("@babel/core");

module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'json'],
    transform: {
        '^.+\\.(js|jsx)$': ['babel-jest', { babelrc: false, configFile: true, rootMode: 'root' }],
    },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
}