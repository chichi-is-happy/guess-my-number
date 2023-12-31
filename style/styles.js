import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9a4ae",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    borderColor: "#686bb2",
    borderWidth: 1,
    width: 300,
    height: "100%",
    backgroundColor: "#D3CCB7",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    borderColor: "#686bb2",
    borderWidth: 1,
    width: 250,
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBox: {
    borderColor: "#686bb2",
    borderWidth: 1,
    width: 250,
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    marginTop: 170,
    backgroundColor: "#4D8AA0",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 25,
    borderColor: "#ebb6c6",
    borderBottomWidth: 20,
    borderWidth: 6,
    position: "relative",
    marginVertical: 25,
    width: 197,
  },
  secondScreen: {
    backgroundColor: "#5b69a0",
    height: 255,
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
    width: 200,
    position: "absolute",
    zIndex: -1,
    top: +95,
    left: -1,
    borderRadius: 5,
  },
  textInput: {
    marginBottom: 20,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f5fc",
    color: "#f0f5fc",
    position: "absolute",
  },
  text: {
    position: "absolute",
    fontSize: 20,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#f0f5fc",
  },
  buttonStyle: {
    backgroundColor: "#eda2b3",
    borderWidth: 1,
    borderColor: "#4D8AA0",
    borderRadius: 100,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});
