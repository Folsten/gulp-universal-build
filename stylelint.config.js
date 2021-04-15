// Use it only if you plan to use Tailwind CSS in your project, otherwise you may delete this.
// This extension as linter allow you to avoid wrong errors while using Tailwind CSS.
// To activate this configuration you need to install "stylelint" extension in your code editor.
// P.S This is just linter, not a part of any functionality.

module.exports = {
  ignoreFiles: ["**/*.sass"],
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
};