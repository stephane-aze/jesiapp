module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')],
      // WITH jest-preset-angular > v7
      // astTransformers: [
      //   'jest-preset-angular/build/InlineFilesTransformer',
      //   'jest-preset-angular/build/StripStylesTransformer',
      // ],
    },
  },
  setupFilesAfterEnv: ['<rootDir>/node_modules/@angular-builders/jest/dist/jest-config/setup.js'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  testMatch: ['**/*.spec.ts'],
  testEnvironment: 'jest-environment-jsdom-thirteen',
  moduleNameMapper: {},
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/*.array.ts',
    '!src/app/fragmentTypes.ts',
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', 'src/app/*.{js}'],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
  // WITH jest-preset-angular > v7
  // snapshotSerializers: [
  //   'jest-preset-angular/build/AngularSnapshotSerializer.js',
  //   'jest-preset-angular/build/HTMLCommentSerializer.js',
  // ],
};
