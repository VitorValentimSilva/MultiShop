module.exports = {
  // * Extends the conventional commits standard
  // * This enforces a widely adopted commit message format
  extends: ["@commitlint/config-conventional"],

  rules: {
    // * Defines the allowed commit types
    // ! Any commit type outside this list will be rejected
    "type-enum": [
      2,
      "always",
      [
        "feat", // * New feature
        "fix", // * Bug fix
        "docs", // * Documentation only changes
        "style", // * Code style changes (formatting, no logic)
        "refactor", // * Code refactoring without behavior change
        "perf", // * Performance improvements
        "test", // * Adding or fixing tests
        "build", // * Build system or external dependencies
        "chore", // * Maintenance tasks
        "ci", // * CI/CD related changes
        "revert", // * Reverts a previous commit
      ],
    ],

    // * Enforces lowercase commit types (e.g. feat, fix)
    "type-case": [2, "always", "lower-case"],

    // ! Scope must NOT be empty (e.g. feat(auth): ...)
    "scope-empty": [1, "never"],

    // ! Commit subject is mandatory
    "subject-empty": [2, "never"],

    // * Keeps commit messages readable and concise
    "subject-max-length": [2, "always", 72],
  },
};
