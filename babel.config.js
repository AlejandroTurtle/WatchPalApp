module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@/src': './src/',
          '@/assets': './src/assets/',
          '@/components': './src/components/',
          '@/config': './src/config/',
          '@/context': './src/context/',
          '@/libs': './src/libs/',
          '@/screens': './src/screens/',
          '@/services': './src/services/',
          '@/utils': './src/utils/',
          '@/types': './src/types/',
        },
      },
    ],
  ],
};
