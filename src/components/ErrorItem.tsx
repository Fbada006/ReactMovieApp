import React from "react";
import {StyleSheet, View, Text, useColorScheme} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {Colors} from "react-native/Libraries/NewAppScreen";

const ErrorItem = () => {
  const {container, errorMessage} = styles;
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const textColorStyle = {
    color: isDarkMode ? "white" : "black",
  };

  return (
    <View style={[container, backgroundStyle]}>
      <Text style={[errorMessage, textColorStyle]}>
        Sorry, something went wrong
      </Text>
      <Feather name={"frown"} size={100} color={"green"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 30,
    marginHorizontal: 12,
    textAlign: "center",
    paddingBottom: 18,
  },
});

export default ErrorItem;
