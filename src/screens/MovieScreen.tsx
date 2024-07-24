import {FlatList, ListRenderItem} from "react-native";
import {SafeAreaView, StatusBar, StyleSheet} from "react-native";
import {SAMPLE_JSON} from "../utils/Constants";
import MovieItem from "../components/MovieItem";

export const MovieScreen = () => {
  const {container} = styles;
  const renderItem: ListRenderItem<Movie> = ({item}) => {
    return <MovieItem movie={item} />;
  };

  return (
    <SafeAreaView style={container}>
      <FlatList
        data={SAMPLE_JSON.results}
        renderItem={renderItem}
        keyExtractor={(movie: Movie) => movie.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
