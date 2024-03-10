module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "~/api": "./src/api",
          "~/assets": "./src/assets",
          "~/components": "./src/components",
          "~/config": "./src/config",
          "~/contexts": "./src/contexts",
          "~/screens": "./src/screens",
          "~/store": "./src/store",
          "~/theme": "./src/theme",
          "~/types": "./src/types",
        }
      }
    ]
  ]
};
