const fp = require('lodash/fp');


const styleExtensionRegex = /\.(css|less|scss|sass)$/;

function getStyleImportNodeData(node) {
  const styleFilePath = fp.get("source.value")(node);

  if (styleFilePath && styleExtensionRegex.test(styleFilePath)) {
    const importNode = fp.compose(
      fp.find({ type: "ImportDefaultSpecifier" }),
      fp.get("specifiers")
    )(node);

    const importName = fp.get("local.name")(importNode);
    if (importName) {
      return {
        importName,
        styleFilePath,
        importNode,
      }
    }
  }
}
/**
 * @param {string} name
 * @param {'kebab' | 'snake' | 'camel'} caseType 
 * @param {'Identifier' | 'Literal'} propertyType
 */
function notAllowCase(name, caseType, propertyType) {
  if (propertyType === 'Identifier') return true;
}

module.exports = {
  getStyleImportNodeData,
  notAllowCase
}