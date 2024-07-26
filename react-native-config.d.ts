declare module "react-native-config" {
  export interface NativeConfig {
    TMDB_AUTH: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
