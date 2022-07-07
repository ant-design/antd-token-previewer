module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/utils/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!.*@(babel|antd))(?!array-move)[^/]+?/(?!(es|node_modules)/)',
  ],
};
