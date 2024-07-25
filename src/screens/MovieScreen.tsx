import {FlatList, ListRenderItem, TouchableOpacity} from "react-native";
import {SafeAreaView, StatusBar, StyleSheet} from "react-native";
import {SAMPLE_JSON} from "../utils/Constants";
import MovieItem from "../components/MovieItem";
import {useNavigation} from "@react-navigation/native";

export const MovieScreen = () => {
  const navigation: any = useNavigation();
  const {container} = styles;

  const _onPress = (movie: Movie) => {
    navigation.navigate("Movie-Details", {movie});
  };

  const renderItem: ListRenderItem<Movie> = ({item}) => {
    return (
      <TouchableOpacity onPress={() => _onPress(item)}>
        <MovieItem movie={item} />
      </TouchableOpacity>
    );
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
  },
});
