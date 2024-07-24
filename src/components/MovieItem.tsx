import {Image, StyleSheet, Text, View} from "react-native";
import {TMDB_IMAGE_BASE_URL} from "../utils/Constants";

type MovieProp = {
  movie: Movie;
};

const MovieItem = ({movie}: MovieProp) => {
  const {title, release_date, vote_average, backdrop_path} = movie;
  const {container, dateRating, image} = styles;

  return (
    <View style={container}>
      <Text>{title}</Text>
      <Image
        style={image}
        source={{
          uri: `${TMDB_IMAGE_BASE_URL}${backdrop_path}`,
        }}
      />
      <View style={dateRating}>
        <Text>{release_date}</Text>
        <Text>{`Rating: ${vote_average}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  dateRating: {
    flexDirection: "row",
    gap: 20,
  },
  image: {
    alignSelf: "stretch",
    height: 250,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default MovieItem;
