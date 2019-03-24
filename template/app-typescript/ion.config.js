module.exports = {
  port: 8000,
  entry: {
    app: ['./src/index.tsx'],
  },
  dllEntry: ['react', 'react-dom'],
  cssModule: true,
  sourceMap: true,
  babel: {
    // plugins: [
    //   ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    // ],
  },
  postcss: {
    autoprefixer: {
      browsers: ['iOS >= 8', 'Android >= 4'],
    },
    pxtorem: { remUnit: 75, exclude: /node_module/, baseDpr: 2 },
  },
  copy: {
    from: './public',
    to: './dist',
  }
};
