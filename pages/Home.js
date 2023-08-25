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
    const parsedNumber = parseInt(inputNumber);
    setAnswer(parsedNumber);
    console.log("answer: ", answer);
    console.log("타입: ", typeof answer);
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
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeAnswer}
          keyboardType="numeric"
        ></TextInput>
        <Text>번호를 입력해 주세요</Text>
        <Button title="게임 시작" onPress={gameStart} />
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
  textInput: {
    borderWidth: 1,
    borderColor: "pink",
    borderRadius: 100,
    marginBottom: 20,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
  },
});

export default Home;
