module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "perf",
        "ci",
      ],
    ],
    "scope-empty": [1, "never"],
    "subject-empty": [2, "never"],
    "subject-max-length": [2, "always", 72],
  },
};
