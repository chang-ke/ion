module.exports = {
  rootDir: __dirname,
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/lib/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/coverage/',
  collectCoverageFrom: ['src/config/**', 'src/util/**'],
  moduleDirectories: ['node_modules', 'src', 'utils'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.ts$',
  testPathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsConfig: '../tsconfig.json',  // 此处是根据命令行路径进行配置
    },
  },
};
