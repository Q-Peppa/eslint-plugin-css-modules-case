const _ = require('lodash');
const {
  getStyleImportNodeData,
  notAllowCase
} = require("./core");

module.exports = {
  meta: {
    descrption: "this rule is not allow camel-case in css-modules style file",
    messages: {
      "errorCase": "{{name}} case incompatible with {{caseType}}-case, should be {{rightCase}}",
    },
    type: 'problem',
    fixable: 'code',
    schema: [
      {
        type: "object",
        properties: {
          "case": {
            enum: [true, 'kebab', 'snake']
          }
        }
      }
    ],
  },
  create(context) {
    const moduleCase = _.get(context, ['options', 0, 'case'], "kebab") || "kebab";
    if (!['kebab', 'snake'].includes(moduleCase)) {
      throw new Error("case option must be kebab or snake")
    }
    const styleImportNameSet = new Set();
    return {
      ImportDeclaration(node) {
        const styleImportNodeData = getStyleImportNodeData(node);
        if (!styleImportNodeData) return;
        const { importName, } = styleImportNodeData;
        styleImportNameSet.add(importName);
      },
      MemberExpression(node) {
        // for-example : styles.appName
        const objectName = _.get(node, ['object', 'name']); // styles
        const propertyName = _.get(node, ['property', 'name']); // appName
        const propertyType = _.get(node, ['property', 'type']); // Identifier or Literal
        if (!propertyName) return;
        if (styleImportNameSet.has(objectName) && notAllowCase(propertyName, moduleCase, propertyType)) {
          const caseMap = {
            'kebab': _.kebabCase,
            'snake': _.snakeCase,
          }
          const start = node.property.range[0];
          const end = node.property.range[1];
          const ans = caseMap[moduleCase](propertyName);
          context.report({
            node,
            data: {
              name: propertyName,
              rightCase: caseMap[moduleCase](propertyName),
              caseType: moduleCase
            },
            messageId: "errorCase",
            fix(fixer) {
              return fixer.replaceTextRange(
                [start - 1, end]
                , `["${ans}"]`
              )
            }
          });
        }
      }
    }
  }
}