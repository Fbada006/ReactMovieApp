import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView, StatusBar, StyleSheet} from "react-native";
import MovieItem from "../components/MovieItem";
import {useNavigation} from "@react-navigation/native";
import {useGetMovies} from "../hooks/useGetMovies";
import ErrorItem from "../components/ErrorItem";

export const MovieScreen = () => {
  const [loading, error, movies] = useGetMovies();
  const navigation: any = useNavigation();
  const {container} = styles;
  const response = movies as ApiResponse;

  console.log(loading, error, movies);

  const _onPress = (item: Movie) => {
    navigation.navigate("Movie-Details", {item});
  };

  const renderItem: ListRenderItem<Movie> = ({item}) => {
    return (
      <TouchableOpacity onPress={() => _onPress(item)}>
        <MovieItem movie={item} />
      </TouchableOpacity>
    );
  };

  if (movies != null && !loading) {
    return (
      <SafeAreaView style={container}>
        <FlatList
          data={response.results}
          renderItem={renderItem}
          keyExtractor={(movie: Movie) => movie.id}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <ErrorItem />
      ) : (
        <ActivityIndicator size={"large"} color={"blue"} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
