const RuleTester = require("eslint").RuleTester;

function test(t) {
  return {
    ...t,
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
      ...t.parserOptions,
    },
  }
}
const ruleTester = new RuleTester();

ruleTester.run("no-camel-case", require("../../lib/rules/no-camel-case"), {
  valid: [
    test({
      options: [{}],
      code: `
        import x from "./styles.scss";
        const a = x["app-name"];
      `
    })
  ],
  invalid: [
    test({
      options: [{
        // no case option
      }],
      code: `
        import x from "./styles.scss";
        const a = x.appName;
      `,
      errors: [
        `appName case incompatible with kebab-case, should be app-name`
      ],
      output: `
        import x from "./styles.scss";
        const a = x["app-name"];
      `
    }),
    test({
      options: [{
        "case": "snake"
      }],
      code: `
        import x from "./styles.scss";
        const a = x.appName;
      `,
      errors: [
        `appName case incompatible with snake-case, should be app_name`
      ],
      output: `
        import x from "./styles.scss";
        const a = x["app_name"];
      `
    }),
    test({
      options: [{
        "case": "kebab"
      }],
      code: `
        import x from "./styles.scss";
        const a = x.appName;
      `,
      errors: [
        `appName case incompatible with kebab-case, should be app-name`
      ],
      output: `
        import x from "./styles.scss";
        const a = x["app-name"];
      `
    })
  ]
});