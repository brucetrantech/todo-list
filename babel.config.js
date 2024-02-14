module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './apps',
        },
      },
    ],
  ],
  // plugins: [
  //   [
  //     'babel-plugin-root-import',
  //     {
  //       paths: [
  //         {
  //           rootPathSuffix: './apps/assets',
  //           rootPathPrefix: 'assets',
  //         },
  //         {
  //           rootPathSuffix: './apps/commons',
  //           rootPathPrefix: 'commons',
  //         },
  //         {
  //           rootPathSuffix: './apps/cores',
  //           rootPathPrefix: 'cores',
  //         },
  //         {
  //           rootPathSuffix: './apps/screens',
  //           rootPathPrefix: 'screens',
  //         },
  //         {
  //           rootPathSuffix: './apps/storages',
  //           rootPathPrefix: 'storages',
  //         },
  //       ],
  //     },
  //   ],
  // ],
};
