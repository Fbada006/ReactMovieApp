import { ActivityIndicator, View } from "react-native";

export const LoadingIndicator = () => (
    <View>
      <ActivityIndicator size={"large"} color={"blue"} />
    </View>
  );