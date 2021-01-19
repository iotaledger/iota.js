module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:jsdoc/recommended",
        "plugin:unicorn/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.eslint.json",
        "tsconfigRootDir": __dirname,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "import",
        "jsdoc",
        "unicorn",
        "header"
    ],
    "settings": {
        "jsdoc": {
            "ignoreInternal": true
        }
    },
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": [
            "error"
        ],
        "@typescript-eslint/array-type": [
            "error"
        ],
        "@typescript-eslint/await-thenable": [
            "error"
        ],
        "@typescript-eslint/ban-ts-comment": [
            "error"
        ],
        "@typescript-eslint/ban-types": [
            "error"
        ],
        "@typescript-eslint/brace-style": [
            "error"
        ],
        "@typescript-eslint/class-literal-property-style": [
            "error"
        ],
        "@typescript-eslint/comma-spacing": [
            "error"
        ],
        "@typescript-eslint/consistent-type-assertions": [
            "error"
        ],
        "@typescript-eslint/consistent-type-definitions": [
            "error"
        ],
        "@typescript-eslint/default-param-last": [
            "error"
        ],
        "@typescript-eslint/dot-notation": [
            "error"
        ],
        "@typescript-eslint/explicit-function-return-type": [
            "off"
        ],
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "overrides": {
                    "constructors": "no-public"
                }
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": [
            "off"
        ],
        "@typescript-eslint/func-call-spacing": [
            "error"
        ],
        "@typescript-eslint/indent": [
            "off"
        ],
        "@typescript-eslint/init-declarations": [
            "off"
        ],
        "@typescript-eslint/keyword-spacing": [
            "error"
        ],
        "@typescript-eslint/lines-between-class-members": [
            "error"
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error"
        ],
        "@typescript-eslint/member-ordering": [
            "error"
        ],
        "@typescript-eslint/method-signature-style": [
            "off"
        ],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "variable",
                "format": [
                    "camelCase",
                    "UPPER_CASE"
                ]
            }
        ],
        "@typescript-eslint/no-array-constructor": [
            "error"
        ],
        "@typescript-eslint/no-base-to-string": [
            "error"
        ],
        "@typescript-eslint/no-dupe-class-members": [
            "error"
        ],
        "@typescript-eslint/no-dynamic-delete": [
            "off"
        ],
        "@typescript-eslint/no-empty-function": [
            "off"
        ],
        "@typescript-eslint/no-empty-interface": [
            "error"
        ],
        "@typescript-eslint/no-explicit-any": [
            "error"
        ],
        "@typescript-eslint/no-extra-non-null-assertion": [
            "error"
        ],
        "@typescript-eslint/no-extra-parens": [
            "off"
        ],
        "@typescript-eslint/no-extra-semi": [
            "error"
        ],
        "@typescript-eslint/no-extraneous-class": [
            "off"
        ],
        "@typescript-eslint/no-floating-promises": [
            "error"
        ],
        "@typescript-eslint/no-for-in-array": [
            "error"
        ],
        "@typescript-eslint/no-implied-eval": [
            "error"
        ],
        "@typescript-eslint/no-inferrable-types": [
            "off"
        ],
        "@typescript-eslint/no-invalid-this": [
            "error"
        ],
        "@typescript-eslint/no-invalid-void-type": [
            "error"
        ],
        "@typescript-eslint/no-magic-numbers": [
            "off"
        ],
        "@typescript-eslint/no-misused-new": [
            "error"
        ],
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                "checksVoidReturn": false
            }
        ],
        "@typescript-eslint/no-namespace": [
            "error"
        ],
        "@typescript-eslint/no-non-null-asserted-optional-chain": [
            "error"
        ],
        "@typescript-eslint/no-non-null-assertion": [
            "error"
        ],
        "@typescript-eslint/no-parameter-properties": [
            "error"
        ],
        "@typescript-eslint/no-require-imports": [
            "error"
        ],
        "@typescript-eslint/no-this-alias": [
            "error"
        ],
        "@typescript-eslint/no-throw-literal": [
            "error"
        ],
        "@typescript-eslint/no-type-alias": [
            "off"
        ],
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": [
            "error"
        ],
        "@typescript-eslint/no-unnecessary-condition": [
            "off"
        ],
        "@typescript-eslint/no-unnecessary-qualifier": [
            "error"
        ],
        "@typescript-eslint/no-unnecessary-type-arguments": [
            "error"
        ],
        "@typescript-eslint/no-unnecessary-type-assertion": [
            "error"
        ],
        "@typescript-eslint/no-unsafe-assignment": [
            "off"
        ],
        "@typescript-eslint/no-unsafe-call": [
            "off"
        ],
        "@typescript-eslint/no-unsafe-member-access": [
            "off"
        ],
        "@typescript-eslint/no-unsafe-return": [
            "error"
        ],
        "@typescript-eslint/no-unused-expressions": [
            "error"
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "args": "none"
            }
        ],
        "@typescript-eslint/no-unused-vars-experimental": [
            "off"
        ],
        "@typescript-eslint/no-use-before-define": [
            "off"
        ],
        "@typescript-eslint/no-useless-constructor": [
            "error"
        ],
        "@typescript-eslint/no-var-requires": [
            "error"
        ],
        "@typescript-eslint/prefer-as-const": [
            "error"
        ],
        "@typescript-eslint/prefer-for-of": [
            "off"
        ],
        "@typescript-eslint/prefer-function-type": [
            "error"
        ],
        "@typescript-eslint/prefer-includes": [
            "error"
        ],
        "@typescript-eslint/prefer-namespace-keyword": [
            "error"
        ],
        "@typescript-eslint/prefer-nullish-coalescing": [
            "error"
        ],
        "@typescript-eslint/prefer-optional-chain": [
            "error"
        ],
        "@typescript-eslint/prefer-readonly": [
            "error"
        ],
        "@typescript-eslint/prefer-readonly-parameter-types": [
            "off"
        ],
        "@typescript-eslint/prefer-reduce-type-parameter": [
            "error"
        ],
        "@typescript-eslint/prefer-regexp-exec": [
            "error"
        ],
        "@typescript-eslint/prefer-string-starts-ends-with": [
            "error"
        ],
        "@typescript-eslint/prefer-ts-expect-error": [
            "error"
        ],
        "@typescript-eslint/promise-function-async": [
            "error"
        ],
        "@typescript-eslint/quotes": [
            "error"
        ],
        "@typescript-eslint/require-array-sort-compare": [
            "off"
        ],
        "@typescript-eslint/require-await": [
            "off"
        ],
        "@typescript-eslint/restrict-plus-operands": [
            "error"
        ],
        "@typescript-eslint/restrict-template-expressions": [
            "off"
        ],
        "@typescript-eslint/return-await": [
            "error"
        ],
        "@typescript-eslint/semi": [
            "error"
        ],
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                "anonymous": "never",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        "@typescript-eslint/strict-boolean-expressions": [
            "off"
        ],
        "@typescript-eslint/switch-exhaustiveness-check": [
            "error"
        ],
        "@typescript-eslint/triple-slash-reference": [
            "error"
        ],
        "@typescript-eslint/type-annotation-spacing": [
            "error"
        ],
        "@typescript-eslint/typedef": [
            "error",
            {
                "arrowParameter": false
            }
        ],
        "@typescript-eslint/unbound-method": [
            "error"
        ],
        "@typescript-eslint/unified-signatures": [
            "error"
        ],
        "accessor-pairs": [
            "error"
        ],
        "array-bracket-newline": [
            "error"
        ],
        "array-bracket-spacing": [
            "error"
        ],
        "array-element-newline": [
            "off"
        ],
        "arrow-body-style": [
            "error"
        ],
        "arrow-parens": [
            "error",
            "as-needed"
        ],
        "arrow-spacing": [
            "error"
        ],
        "block-scoped-var": [
            "error"
        ],
        "block-spacing": [
            "error"
        ],
        "brace-style": [
            "off"
        ],
        "callback-return": [
            "off"
        ],
        "camelcase": [
            "error"
        ],
        "capitalized-comments": [
            "off"
        ],
        "class-methods-use-this": [
            "off"
        ],
        "comma-dangle": [
            "error"
        ],
        "comma-spacing": [
            "off"
        ],
        "comma-style": [
            "error"
        ],
        "complexity": [
            "off"
        ],
        "computed-property-spacing": [
            "error"
        ],
        "consistent-return": [
            "off"
        ],
        "consistent-this": [
            "error"
        ],
        "constructor-super": [
            "off"
        ],
        "curly": [
            "error"
        ],
        "default-case": [
            "error"
        ],
        "default-param-last": [
            "off"
        ],
        "dot-location": [
            "error",
            "property"
        ],
        "dot-notation": [
            "off"
        ],
        "eol-last": [
            "error"
        ],
        "eqeqeq": [
            "error"
        ],
        "for-direction": [
            "error"
        ],
        "func-call-spacing": [
            "off"
        ],
        "func-name-matching": [
            "error"
        ],
        "func-names": [
            "error"
        ],
        "func-style": [
            "off"
        ],
        "function-call-argument-newline": [
            "off"
        ],
        "function-paren-newline": [
            "off"
        ],
        "generator-star-spacing": [
            "error"
        ],
        "getter-return": [
            "off"
        ],
        "grouped-accessor-pairs": [
            "error"
        ],
        "guard-for-in": [
            "off"
        ],
        "id-blacklist": [
            "error"
        ],
        "id-length": [
            "off"
        ],
        "id-match": [
            "error"
        ],
        "implicit-arrow-linebreak": [
            "off"
        ],
        "import/default": [
            "error"
        ],
        "import/export": [
            "error"
        ],
        "import/named": [
            "off"
        ],
        "import/namespace": [
            "error"
        ],
        "import/no-duplicates": [
            "warn"
        ],
        "import/no-named-as-default": [
            "warn"
        ],
        "import/no-named-as-default-member": [
            "warn"
        ],
        "import/no-unresolved": [
            "error"
        ],
        "import/order": [
            "error",
            {
                "groups": [
                    [
                        "external",
                        "builtin"
                    ],
                    [
                        "internal",
                        "index",
                        "sibling",
                        "parent"
                    ]
                ],
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true
                }
            }
        ],
        "indent": [
            "off"
        ],
        "init-declarations": [
            "off"
        ],
        "jsx-quotes": [
            "error"
        ],
        "key-spacing": [
            "error"
        ],
        "keyword-spacing": [
            "off"
        ],
        "line-comment-position": [
            "off"
        ],
        "linebreak-style": [
            "error"
        ],
        "lines-around-comment": [
            "off"
        ],
        "lines-between-class-members": [
            "off"
        ],
        "max-classes-per-file": [
            "error"
        ],
        "max-depth": [
            "off"
        ],
        "max-len": [
            "error",
            {
                "ignorePattern": "^import",
                "code": 120
            }
        ],
        "max-lines": [
            "off"
        ],
        "max-lines-per-function": [
            "off"
        ],
        "max-nested-callbacks": [
            "error"
        ],
        "max-params": [
            "off"
        ],
        "max-statements": [
            "off"
        ],
        "max-statements-per-line": [
            "error"
        ],
        "multiline-comment-style": [
            "off"
        ],
        "multiline-ternary": [
            "off"
        ],
        "new-cap": [
            "error"
        ],
        "new-parens": [
            "error"
        ],
        "newline-per-chained-call": [
            "error"
        ],
        "no-alert": [
            "error"
        ],
        "no-array-constructor": [
            "off"
        ],
        "no-async-promise-executor": [
            "error"
        ],
        "no-await-in-loop": [
            "off"
        ],
        "no-bitwise": [
            "error"
        ],
        "no-caller": [
            "error"
        ],
        "no-case-declarations": [
            "error"
        ],
        "no-class-assign": [
            "error"
        ],
        "no-compare-neg-zero": [
            "error"
        ],
        "no-cond-assign": [
            "error"
        ],
        "no-confusing-arrow": [
            "error"
        ],
        "no-console": [
            "off"
        ],
        "no-const-assign": [
            "off"
        ],
        "no-constant-condition": [
            "error"
        ],
        "no-constructor-return": [
            "error"
        ],
        "no-continue": [
            "error"
        ],
        "no-control-regex": [
            "off"
        ],
        "no-debugger": [
            "error"
        ],
        "no-delete-var": [
            "error"
        ],
        "no-div-regex": [
            "error"
        ],
        "no-dupe-args": [
            "off"
        ],
        "no-dupe-class-members": [
            "off"
        ],
        "no-dupe-else-if": [
            "error"
        ],
        "no-dupe-keys": [
            "off"
        ],
        "no-duplicate-case": [
            "error"
        ],
        "no-duplicate-imports": [
            "error"
        ],
        "no-else-return": [
            "error"
        ],
        "no-empty": [
            "off"
        ],
        "no-empty-character-class": [
            "error"
        ],
        "no-empty-function": [
            "off"
        ],
        "no-empty-pattern": [
            "error"
        ],
        "no-eq-null": [
            "error"
        ],
        "no-eval": [
            "error"
        ],
        "no-ex-assign": [
            "error"
        ],
        "no-extend-native": [
            "error"
        ],
        "no-extra-bind": [
            "error"
        ],
        "no-extra-boolean-cast": [
            "error"
        ],
        "no-extra-label": [
            "error"
        ],
        "no-extra-parens": [
            "off"
        ],
        "no-extra-semi": [
            "off"
        ],
        "no-fallthrough": [
            "error"
        ],
        "no-floating-decimal": [
            "error"
        ],
        "no-func-assign": [
            "off"
        ],
        "no-global-assign": [
            "error"
        ],
        "no-implicit-coercion": [
            "error"
        ],
        "no-implicit-globals": [
            "error"
        ],
        "no-implied-eval": [
            "error"
        ],
        "no-import-assign": [
            "off"
        ],
        "no-inline-comments": [
            "off"
        ],
        "no-inner-declarations": [
            "error"
        ],
        "no-invalid-regexp": [
            "error"
        ],
        "no-invalid-this": [
            "off"
        ],
        "no-irregular-whitespace": [
            "error"
        ],
        "no-iterator": [
            "error"
        ],
        "no-label-var": [
            "error"
        ],
        "no-labels": [
            "error"
        ],
        "no-lone-blocks": [
            "error"
        ],
        "no-lonely-if": [
            "error"
        ],
        "no-loop-func": [
            "off"
        ],
        "no-loss-of-precision": [
            "off"
        ],
        "no-magic-numbers": [
            "off"
        ],
        "no-misleading-character-class": [
            "error"
        ],
        "no-mixed-operators": [
            "error"
        ],
        "no-mixed-spaces-and-tabs": [
            "error"
        ],
        "no-multi-assign": [
            "error"
        ],
        "no-multi-spaces": [
            "error"
        ],
        "no-multi-str": [
            "error"
        ],
        "no-multiple-empty-lines": [
            "error"
        ],
        "no-negated-condition": [
            "off"
        ],
        "no-nested-ternary": [
            "off"
        ],
        "no-new": [
            "error"
        ],
        "no-new-func": [
            "error"
        ],
        "no-new-object": [
            "error"
        ],
        "no-new-symbol": [
            "off"
        ],
        "no-new-wrappers": [
            "error"
        ],
        "no-obj-calls": [
            "off"
        ],
        "no-octal": [
            "error"
        ],
        "no-octal-escape": [
            "error"
        ],
        "no-param-reassign": [
            "off"
        ],
        "no-plusplus": [
            "off"
        ],
        "no-proto": [
            "error"
        ],
        "no-prototype-builtins": [
            "error"
        ],
        "no-redeclare": [
            "off"
        ],
        "no-regex-spaces": [
            "error"
        ],
        "no-restricted-globals": [
            "error"
        ],
        "no-restricted-imports": [
            "error"
        ],
        "no-restricted-properties": [
            "error"
        ],
        "no-restricted-syntax": [
            "error"
        ],
        "no-return-assign": [
            "error"
        ],
        "no-return-await": [
            "off"
        ],
        "no-script-url": [
            "error"
        ],
        "no-self-assign": [
            "error"
        ],
        "no-self-compare": [
            "error"
        ],
        "no-sequences": [
            "error"
        ],
        "no-setter-return": [
            "off"
        ],
        "no-shadow": [
            "error"
        ],
        "no-shadow-restricted-names": [
            "error"
        ],
        "no-sparse-arrays": [
            "error"
        ],
        "no-tabs": [
            "error"
        ],
        "no-template-curly-in-string": [
            "error"
        ],
        "no-ternary": [
            "off"
        ],
        "no-this-before-super": [
            "off"
        ],
        "no-throw-literal": [
            "error"
        ],
        "no-trailing-spaces": [
            "error"
        ],
        "no-undef": [
            "off"
        ],
        "no-undef-init": [
            "error"
        ],
        "no-undefined": [
            "off"
        ],
        "no-underscore-dangle": [
            "off"
        ],
        "no-unexpected-multiline": [
            "error"
        ],
        "no-unmodified-loop-condition": [
            "error"
        ],
        "no-unneeded-ternary": [
            "error"
        ],
        "no-unreachable": [
            "off"
        ],
        "no-unsafe-finally": [
            "error"
        ],
        "no-unsafe-negation": [
            "off"
        ],
        "no-unused-expressions": [
            "off"
        ],
        "no-unused-labels": [
            "error"
        ],
        "no-unused-vars": [
            "error",
            {
                "args": "none"
            }
        ],
        "no-use-before-define": [
            "off"
        ],
        "no-useless-call": [
            "error"
        ],
        "no-useless-catch": [
            "error"
        ],
        "no-useless-computed-key": [
            "error"
        ],
        "no-useless-concat": [
            "error"
        ],
        "no-useless-constructor": [
            "off"
        ],
        "no-useless-escape": [
            "error"
        ],
        "no-useless-rename": [
            "error"
        ],
        "no-useless-return": [
            "error"
        ],
        "no-var": [
            "error"
        ],
        "no-void": [
            "error"
        ],
        "no-warning-comments": [
            "error"
        ],
        "no-whitespace-before-property": [
            "error"
        ],
        "no-with": [
            "error"
        ],
        "nonblock-statement-body-position": [
            "error"
        ],
        "object-curly-newline": [
            "error"
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "object-property-newline": [
            "off"
        ],
        "object-shorthand": [
            "error"
        ],
        "one-var": [
            "error",
            "never"
        ],
        "one-var-declaration-per-line": [
            "error"
        ],
        "operator-assignment": [
            "error"
        ],
        "operator-linebreak": [
            "error"
        ],
        "padded-blocks": [
            "error",
            "never"
        ],
        "padding-line-between-statements": [
            "error"
        ],
        "prefer-arrow-callback": [
            "error"
        ],
        "prefer-const": [
            "error"
        ],
        "prefer-destructuring": [
            "off"
        ],
        "prefer-exponentiation-operator": [
            "off"
        ],
        "prefer-named-capture-group": [
            "off"
        ],
        "prefer-numeric-literals": [
            "error"
        ],
        "prefer-object-spread": [
            "error"
        ],
        "prefer-promise-reject-errors": [
            "error"
        ],
        "prefer-regex-literals": [
            "error"
        ],
        "prefer-rest-params": [
            "error"
        ],
        "prefer-spread": [
            "error"
        ],
        "prefer-template": [
            "error"
        ],
        "quote-props": [
            "off"
        ],
        "quotes": [
            "off"
        ],
        "radix": [
            "error"
        ],
        "require-atomic-updates": [
            "off"
        ],
        "require-await": [
            "off"
        ],
        "require-unicode-regexp": [
            "off"
        ],
        "require-yield": [
            "error"
        ],
        "rest-spread-spacing": [
            "error"
        ],
        "semi": [
            "off"
        ],
        "semi-spacing": [
            "error"
        ],
        "semi-style": [
            "error"
        ],
        "sort-imports": [
            "off"
        ],
        "sort-keys": [
            "off"
        ],
        "sort-vars": [
            "error"
        ],
        "space-before-blocks": [
            "error"
        ],
        "space-before-function-paren": [
            "off"
        ],
        "space-in-parens": [
            "error"
        ],
        "space-infix-ops": [
            "error"
        ],
        "space-unary-ops": [
            "error"
        ],
        "spaced-comment": [
            "error"
        ],
        "strict": [
            "error"
        ],
        "switch-colon-spacing": [
            "error"
        ],
        "symbol-description": [
            "error"
        ],
        "template-curly-spacing": [
            "error"
        ],
        "template-tag-spacing": [
            "error"
        ],
        "unicode-bom": [
            "error"
        ],
        "unicorn/better-regex": [
            "error"
        ],
        "unicorn/catch-error-name": [
            "off"
        ],
        "unicorn/consistent-function-scoping": [
            "error"
        ],
        "unicorn/custom-error-definition": [
            "off"
        ],
        "unicorn/empty-brace-spaces": [
            "off"
        ],
        "unicorn/error-message": [
            "error"
        ],
        "unicorn/escape-case": [
            "error"
        ],
        "unicorn/expiring-todo-comments": [
            "error"
        ],
        "unicorn/explicit-length-check": [
            "error"
        ],
        "unicorn/filename-case": [
            "off"
        ],
        "unicorn/import-index": [
            "error"
        ],
        "unicorn/import-style": [
            "error"
        ],
        "unicorn/new-for-builtins": [
            "error"
        ],
        "unicorn/no-abusive-eslint-disable": [
            "error"
        ],
        "unicorn/no-array-instanceof": [
            "error"
        ],
        "unicorn/no-console-spaces": [
            "error"
        ],
        "unicorn/no-fn-reference-in-iterator": [
            "error"
        ],
        "unicorn/no-for-loop": [
            "off"
        ],
        "unicorn/no-hex-escape": [
            "error"
        ],
        "unicorn/no-keyword-prefix": [
            "off"
        ],
        "unicorn/no-nested-ternary": [
            "error"
        ],
        "unicorn/no-new-buffer": [
            "error"
        ],
        "unicorn/no-null": [
            "off"
        ],
        "unicorn/no-process-exit": [
            "error"
        ],
        "unicorn/no-reduce": [
            "off"
        ],
        "unicorn/no-unreadable-array-destructuring": [
            "error"
        ],
        "unicorn/no-unsafe-regex": [
            "off"
        ],
        "unicorn/no-unused-properties": [
            "off"
        ],
        "unicorn/no-useless-undefined": [
            "error"
        ],
        "unicorn/no-zero-fractions": [
            "error"
        ],
        "unicorn/number-literal-case": [
            "error"
        ],
        "unicorn/prefer-add-event-listener": [
            "error"
        ],
        "unicorn/prefer-dataset": [
            "error"
        ],
        "unicorn/prefer-event-key": [
            "error"
        ],
        "unicorn/prefer-flat-map": [
            "error"
        ],
        "unicorn/prefer-includes": [
            "error"
        ],
        "unicorn/prefer-modern-dom-apis": [
            "error"
        ],
        "unicorn/prefer-negative-index": [
            "error"
        ],
        "unicorn/prefer-node-append": [
            "error"
        ],
        "unicorn/prefer-node-remove": [
            "error"
        ],
        "unicorn/prefer-number-properties": [
            "error"
        ],
        "unicorn/prefer-optional-catch-binding": [
            "error"
        ],
        "unicorn/prefer-query-selector": [
            "error"
        ],
        "unicorn/prefer-reflect-apply": [
            "error"
        ],
        "unicorn/prefer-replace-all": [
            "off"
        ],
        "unicorn/prefer-set-has": [
            "error"
        ],
        "unicorn/prefer-spread": [
            "error"
        ],
        "unicorn/prefer-starts-ends-with": [
            "error"
        ],
        "unicorn/prefer-string-slice": [
            "error"
        ],
        "unicorn/prefer-text-content": [
            "error"
        ],
        "unicorn/prefer-trim-start-end": [
            "error"
        ],
        "unicorn/prefer-type-error": [
            "error"
        ],
        "unicorn/prevent-abbreviations": [
            "off"
        ],
        "unicorn/string-content": [
            "off"
        ],
        "unicorn/throw-new-error": [
            "error"
        ],
        "use-isnan": [
            "error"
        ],
        "valid-typeof": [
            "off"
        ],
        "vars-on-top": [
            "error"
        ],
        "wrap-iife": [
            "error"
        ],
        "wrap-regex": [
            "off"
        ],
        "yield-star-spacing": [
            "error"
        ],
        "yoda": [
            "error"
        ],
        "jsdoc/newline-after-description": "off",
        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns-type": "off",
        "header/header": [2, "line", [" Copyright 2020 IOTA Stiftung", " SPDX-License-Identifier: Apache-2.0"]]
    }
};