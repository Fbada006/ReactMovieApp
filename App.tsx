import React from "react";
import {useColorScheme} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {MovieScreen} from "./src/screens/MovieScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import MovieDetailsScreen from "./src/screens/MovieDetailsScreen";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Discover-Movies"
          component={MovieScreen}
          options={{title: "Discover Movies"}}
        />
        <Stack.Screen
          name="Movie-Details"
          component={MovieDetailsScreen}
          options={{title: "Movie Details"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
