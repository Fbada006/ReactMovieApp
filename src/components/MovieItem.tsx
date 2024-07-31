import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import Image from "react-native-image-progress";
import {TMDB_IMAGE_BASE_URL} from "../utils/Constants";
import {LoadingIndicator} from "./LoadingIndicator";

type MovieProp = {
  movie: Movie;
};

export const renderError = (error: Error) => (
  <View>
    <Text>Error</Text>
  </View>
);

const MovieItem = ({movie}: MovieProp) => {
  const {title, release_date, vote_average, backdrop_path} = movie;
  const {container, dateRating, image, titleStyle, subTitleStyle} = styles;

  return (
    <View style={container}>
      <Text style={titleStyle}>{title}</Text>
      <Image
        style={image}
        source={{
          uri: `${TMDB_IMAGE_BASE_URL}${backdrop_path}`,
        }}
        indicator={LoadingIndicator}
        renderError={renderError}
      />
      <View style={dateRating}>
        <Text style={subTitleStyle}>{release_date}</Text>
        <Text style={subTitleStyle}>{`Rating: ${vote_average}`}</Text>
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
  titleStyle: {
    fontSize: 21,
    fontWeight: "bold",
  },
  subTitleStyle: {
    fontSize: 17,
    fontWeight: "semibold",
    fontStyle: "italic",
  },
});

export default MovieItem;
