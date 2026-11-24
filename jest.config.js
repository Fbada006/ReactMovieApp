module.exports = {
  preset: "react-native",
  setupFiles: ["./jest.setup.js"],
  // Some React Native libraries ship untranspiled ES modules, so let Babel
  // transform them instead of ignoring everything in node_modules.
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-.*)/)",
  ],
};
