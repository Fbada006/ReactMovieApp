import {useRoute} from "@react-navigation/native";
import {StyleSheet, Text, View} from "react-native";

const MovieDetailsScreen = () => {
  const route = useRoute();
  const movie = route.params;

  return (
    <View style={styles.container}>
      <Text>Intuition inaniambia umenisideline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MovieDetailsScreen;
