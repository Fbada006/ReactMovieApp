import {useNavigation, useRoute} from "@react-navigation/native";
import {useEffect} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {TMDB_IMAGE_BASE_URL} from "../utils/Constants";

const MovieDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item}: any = route.params;
  const movie: Movie = item;

  const {title, release_date, vote_average, backdrop_path, overview} = movie;
  const {
    container,
    dateRating,
    image,
    titleStyle,
    subTitleStyle,
    overviewStyle,
  } = styles;

  useEffect(() => {
    navigation.setOptions({title});
  }, [navigation, route.params]);

  return (
    <View style={container}>
      <Image
        style={image}
        source={{
          uri: `${TMDB_IMAGE_BASE_URL}${backdrop_path}`,
        }}
      />
      <Text style={titleStyle}>{title}</Text>
      <Text style={overviewStyle}>{overview}</Text>
      <View style={dateRating}>
        <Text style={subTitleStyle}>{`Released: ${release_date}`}</Text>
        <Text style={subTitleStyle}>{`Rating: ${vote_average}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateRating: {
    flexDirection: "row",
    gap: 20,
  },
  image: {
    alignSelf: "stretch",
    height: 350,
    marginBottom: 10,
  },
  titleStyle: {
    fontSize: 21,
    paddingHorizontal: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overviewStyle: {
    fontSize: 18,
    paddingHorizontal: 16,
    fontWeight: "semibold",
    color: "black",
    marginBottom: 10,
  },
  subTitleStyle: {
    fontSize: 17,
    paddingHorizontal: 16,
    fontWeight: "semibold",
    fontStyle: "italic",
  },
});

export default MovieDetailsScreen;
