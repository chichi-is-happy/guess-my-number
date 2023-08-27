import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { answerNumber } from "../recoilState/state";

const Home = ({ navigation }) => {
  const [answer, setAnswer] = useRecoilState(answerNumber);

  const onChangeAnswer = (inputNumber) => {
    if (!/^\d+$/.test(inputNumber)) return; // 숫자 외의 값이 입력되면 함수 종료

    const parsedNumber = parseInt(inputNumber);
    setAnswer(parsedNumber);
  };

  // 시작 버튼을 누르면 answer 값이 전역 answer state에 저장됨

  // 유효성 검사 함수 : 게임 시작 버튼을 누를 떄 값이 1~99 범위 밖인지
  // true/false 로 반환
  const validateNumberRange = (answer) => {
    console.log("answer 범위: ", answer);
    if (answer > 99 || answer < 1) {
      console.log("answer가 범위 밖 : ", answer);
      return false;
    }
    console.log("answer가 범위 내에 있음 : ", answer);
    return true;
  };

  // alert 함수
  const showRangeAlert = () =>
    Alert.alert("범위 재지정 필요", "1부터 99까지의 숫자를 골라주세요", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  // validateNumberRange가 true면 게임 페이지 이동, 아니면 alert
  const gameStart = () => {
    const validateResult = validateNumberRange(answer);
    if (validateResult === true) {
      console.log("answer: ", answer);
      console.log("다음 페이지로 이동");
      navigation.navigate("GamePage");
    } else {
      console.log("validateNumberRange 범위에 속하지 않음");
      showRangeAlert();
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Enter a Number</Text>
            <View style={styles.screen}>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeAnswer}
                keyboardType="numeric"
                value={answer ? answer.toString() : ""}
              ></TextInput>
            </View>

            <View style={styles.secondScreen}></View>
          </View>

          <View style={styles.buttonBox}>
            <View style={styles.buttonStyle}>
              <Button title="GAME START" onPress={gameStart} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    // borderRadius: 5,
    width: 250,
    height: "100%",
    flex: 1,
    // backgroundColor: "#cfe5ed",
    // alignItems: "center",
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
    // position: "absolute",
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

export default Home;
