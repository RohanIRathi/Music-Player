// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/*',
      '**/node_modules/**',

      '**/.expo/**',
      '**/.next/**',
      '**/__generated__/**',
      '**/build/**',

      '/react-native-lab/react-native/**',
      '/docs/react-native-website/**',

      '**/android/**',
      '**/assets/**',
      '**/bin/**',
      '**/fastlane/**',
      '**/ios/**',
      '**/kotlin/providers/**',
      '**/vendored/**',
      '/docs/public/static/**'
    ],
  },
]);
