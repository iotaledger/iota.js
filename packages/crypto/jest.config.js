module.exports = {
    testMatch: ["<rootDir>/test/**/*.(test|spec).ts"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/index*.ts"],
    testEnvironment: "node"
};
