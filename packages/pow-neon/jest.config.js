module.exports = {
    "testMatch": [
        "<rootDir>/test/**/*.(test|spec).ts"
    ],
    "transform": {
        "^.+\\.ts$": "ts-jest"
    },
    "collectCoverage": true,
    "collectCoverageFrom": [
        '<rootDir>/src/**/*.ts'
    ],
    "testEnvironment": "node"
}