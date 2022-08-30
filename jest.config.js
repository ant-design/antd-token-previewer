module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/utils/setup.js'],
  setupFilesAfterEnv: ['./tests/utils/setupAfterEnv.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!.*@(babel|antd))(?!array-move)[^/]+?/(?!(es|node_modules)/)',
  ],
};
