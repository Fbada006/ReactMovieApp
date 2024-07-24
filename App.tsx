import React from "react";
import {SafeAreaView, useColorScheme} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {MovieScreen} from "./src/screens/MovieScreen";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <MovieScreen />
    </SafeAreaView>
  );
}

export default App;
