if (!window.matchMedia) {
  Object.defineProperty(global.window, 'matchMedia', {
    value: jest.fn((query) => ({
      matches: query.includes('max-width'),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
}
