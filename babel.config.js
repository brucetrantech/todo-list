module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './apps/assets',
            rootPathPrefix: 'assets',
          },
          {
            rootPathSuffix: './apps/commons',
            rootPathPrefix: 'commons',
          },
          {
            rootPathSuffix: './apps/cores',
            rootPathPrefix: 'cores',
          },
          {
            rootPathSuffix: './apps/screens',
            rootPathPrefix: 'screens',
          },
        ],
      },
    ],
  ],
};
