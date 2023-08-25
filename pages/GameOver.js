import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default GameOver = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Text>게임오버</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
