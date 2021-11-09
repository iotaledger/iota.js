module.exports = {
    testMatch: ["<rootDir>/test/**/*.(test|spec).ts"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/src/index*.ts",
        "!<rootDir>/src/polyfill*.ts",
        "!<rootDir>/src/**/I[A-Z]*.ts"
    ],
    testEnvironment: "node"
};
