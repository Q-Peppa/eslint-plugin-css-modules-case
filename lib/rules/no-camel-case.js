const _ = require('lodash');
const {
  getStyleImportNodeData,
  notAllowCase
} = require("./core");

module.export = {
  meta: {
    type: 'problem',
    docs: {
      description: 'camel case is not allowed in css-mnodules',
      fixable: 'code',
      schema: [
        {
          type: "object",
          properties: {
            "moduleCase": {
              enum: [true, 'kebab', 'snake', 'camel']
            }
          }
        }
      ]
    }
  },
  create: function (context) {
    const moduleCase = _.get(context, ['options', 0, 'case']);
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
            'camel': _.camelCase
          }
          context.report({
            node,
            message: `The property name '${propertyName}' is not allowed in css-modules`,
            fix(fixer) {
              return fixer.replaceText(node.property, caseMap[moduleCase](propertyName));
            }
          });
        }
      }
    }

  }
}