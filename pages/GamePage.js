import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { guessList, answerNumber } from "../recoilState/state";

const GamePage = ({ navigation }) => {
  const [list, setList] = useRecoilState(guessList);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(99);
  const answer = useRecoilValue(answerNumber);

  const nowGuessData = list.length && list[list.length - 1];

  const numberToUp = () => {
    const newMin = nowGuessData.number;
    setMinNumber(newMin);
    chooseNumber(newMin, maxNumber);
  };
  const numberToDown = () => {
    const newMax = nowGuessData.number;
    setMaxNumber(newMax);
    chooseNumber(minNumber, newMax);
  };

  // 컴퓨터가 Math.random()으로 함수 실행 시마다 숫자 랜덤 생성
  const chooseNumber = (minNumber, maxNumber) => {
    const randomNumber =
      Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    setList((prev) => [
      ...prev,
      {
        number: randomNumber,
        key: Math.random().toString(),
        count: prev.length + 1,
      },
    ]);
  };

  const showCorrectAnswerAlert = () => {
    setMinNumber(1);
    setMaxNumber(99);
    Alert.alert("정답을 맞췄습니다", "게임 종료 페이지로 이동합니다", [
      { text: "OK", onPress: () => navigation.navigate("GameOver") },
    ]);
  };

  useEffect(() => {
    console.log("minNumber updated: ", minNumber);
    console.log("maxNumber updated: ", maxNumber);
  }, [maxNumber, minNumber]);

  useEffect(() => {
    console.log("list updated: ", list);
    if (answer === nowGuessData.number) {
      console.log("정답, 다음 페이지로 이동");
      showCorrectAnswerAlert();
    }
  }, [list]);

  useEffect(() => {
    chooseNumber(minNumber, maxNumber);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>내가 낸 숫자 : {answer}</Text>

        <Button title="UP" onPress={numberToUp}></Button>
        <Button title="DOWN" onPress={numberToDown}></Button>
        <View style={styles.listContainer}>
          <FlatList
            data={list}
            renderItem={(itemData) => {
              return (
                <>
                  {/* <Text> itemData : {itemData} </Text> */}
                  <Text> 숫자 : {itemData.item.number} </Text>
                  <Text> 횟수 : {itemData.item.count} </Text>
                </>
              );
            }}
            keyExtractor={(item, index) => {
              return item.key;
            }}
            alwaysBounceVertical={false}
          >
            <Text>컴퓨터 제시 기록</Text>
          </FlatList>
        </View>
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
  listContainer: {
    flex: 5,
  },
});

export default GamePage;
