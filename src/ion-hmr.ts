export default function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        if (
          t.isImportDefaultSpecifier(node.specifiers[0]) &&
          node.source.value === 'react-dom'
        ) {
          path.insertAfter(
            t.importDeclaration(
              [t.importSpecifier(t.identifier('hot'), t.identifier('hot'))],
              t.stringLiteral('react-hot-loader/root')
            )
          );
        }
      },
      ExpressionStatement(path) {
        const { node } = path;
        if (
          t.isCallExpression(node.expression) &&
          node.expression.callee.object &&
          node.expression.callee.object.name === 'ReactDOM'
        ) {
          const name = node.expression.arguments[0].openingElement.name.name;
          node.expression.arguments[0].openingElement.name.name = 'Hot' + name;
          path.insertBefore(
            t.variableDeclaration('const', [
              t.variableDeclarator(
                t.identifier('Hot' + name),
                t.callExpression(t.identifier('hot'), [t.identifier(name)])
              ),
            ])
          );
          path.insertAfter(t.identifier('Hot' + name));
        }
      },
    },
  };
}
