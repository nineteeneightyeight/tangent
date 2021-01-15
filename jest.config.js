const { resolve } = require('path')

module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
    coverageDirectory: '__tests__/coverage',
    coverageReporters: ['json', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
    testMatch: ['**/src/**/*.spec.+(ts|tsx|js|jsx)'],
    setupFilesAfterEnv: [resolve('./__tests__/config/setupTests.js')],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(scss|sass|css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
}
