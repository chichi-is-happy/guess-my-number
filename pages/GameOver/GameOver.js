import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { guessList, answerNumber } from "../../recoilState/state";

export default GameOver = ({ navigation }) => {
  const [list, setList] = useRecoilState(guessList);
  const [answerNum, resetAnswerNum] = useRecoilState(answerNumber);
  const answer = useRecoilValue(answerNumber);
  const nowGuessData = list.length && list[list.length - 1];
  const lastDigit = answer % 10;
  const postPosition =
    lastDigit === 2 || lastDigit === 4 || lastDigit === 5 || lastDigit === 9
      ? "를"
      : "을";

  const handleReset = () => {
    setList([]);
    resetAnswerNum("");
    navigation.navigate("Home");
  };

  return (
    <>
      <View style={styles.container}>
        <Text>GAME OVER</Text>
        <Text>당신의 휴대폰은 {nowGuessData.count}번 만에</Text>
        <Text>
          정답 {answer}
          {postPosition} 맞췄습니다
        </Text>
        <Button title="RESTART" onPress={handleReset}></Button>
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
