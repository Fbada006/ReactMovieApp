import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import Image from "react-native-image-progress";
import {TMDB_IMAGE_BASE_URL} from "../utils/Constants";

type MovieProp = {
  movie: Movie;
};

const MovieItem = ({movie}: MovieProp) => {
  const {title, release_date, vote_average, backdrop_path} = movie;
  const {container, dateRating, image, titleStyle, subTitleStyle} = styles;

  const CustomLoadingIndicator = () => (
    <View>
      <ActivityIndicator size={"large"} color={"blue"} />
    </View>
  );

  const renderError = (error: Error) => (
    <View>
      <Text>Error</Text>
    </View>
  );

  return (
    <View style={container}>
      <Text style={titleStyle}>{title}</Text>
      <Image
        style={image}
        source={{
          uri: `${TMDB_IMAGE_BASE_URL}${backdrop_path}`,
        }}
        indicator={CustomLoadingIndicator}
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
