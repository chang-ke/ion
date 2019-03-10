module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        if (
          t.isImportDefaultSpecifier(node.specifiers[0]) &&
          node.source.value === 'react'
        ) {
          path.insertAfter(
            t.importDeclaration(
              [t.importSpecifier(t.identifier('hot'), t.identifier('hot'))],
              t.stringLiteral('react-hot-loader')
            )
          );
        }
      },
      ExportDefaultDeclaration(path) {
        const { node } = path;
        if (
          !path.container.find(
            node => t.isImportDeclaration(node) && node.source.value === 'react'
          )
        ) {
          return;
        }
        if (
          t.isFunctionDeclaration(node.declaration) ||
          t.isClassDeclaration(node.declaration)
        ) {
          path.replaceWithMultiple([
            node.declaration,
            t.exportDefaultDeclaration(
              t.callExpression(
                t.callExpression(t.identifier('hot'), [t.identifier('module')]),
                [node.declaration.id]
              )
            ),
          ]);
        }
        if (t.isIdentifier(node.declaration)) {
          path
            .get('declaration')
            .replaceWith(
              t.callExpression(
                t.callExpression(t.identifier('hot'), [t.identifier('module')]),
                [node.declaration]
              )
            );
        }
      },
    },
  };
};
