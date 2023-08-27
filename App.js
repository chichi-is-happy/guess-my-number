import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import GameOver from "./pages/GameOver";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar style="auto" />

      <RecoilRoot>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="GamePage" component={GamePage} />
            <Stack.Screen name="GameOver" component={GameOver} />
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9a4ae",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
