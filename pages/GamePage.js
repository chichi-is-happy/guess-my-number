import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { guessList, answerNumber } from "../recoilState/state";

const GamePage = ({ navigation }) => {
  const [list, setList] = useRecoilState(guessList);
  const [randomNumber, setRandomNumber] = useState(1);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(99);
  const [excludeNumbers, setExcludeNumbers] = useState([]);
  const answer = useRecoilValue(answerNumber);

  const nowGuessData = list.length && list[list.length - 1];

  const numberToUp = () => {
    const newMin = nowGuessData.number;
    if (answer < newMin) {
      Alert.alert(
        "Miss!",
        "정답이 휴대폰이 제시한 숫자보다 작습니다. 다시 골라주세요.",
        [{ text: "OK" }]
      );
      return;
    }
    setMinNumber(newMin);
    chooseNumber(newMin, maxNumber);
  };
  const numberToDown = () => {
    const newMax = nowGuessData.number;
    if (answer > newMax) {
      Alert.alert(
        "Miss!",
        "정답이 휴대폰이 제시한 숫자보다 큽니다. 다시 골라주세요.",
        [{ text: "OK" }]
      );
      return;
    }
    setMaxNumber(newMax);
    chooseNumber(minNumber, newMax);
  };

  const chooseNumber = (minNumber, maxNumber) => {
    let isDuplicate;
    let newRandom;

    do {
      newRandom =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      isDuplicate = excludeNumbers.includes(newRandom);
    } while (isDuplicate);

    setList((prev) => [
      ...prev,
      {
        number: newRandom,
        key: Math.random().toString(),
        count: prev.length + 1,
      },
    ]);
    setExcludeNumbers((prev) => [...prev, newRandom]);
    setRandomNumber(newRandom);
  };

  const showCorrectAnswerAlert = () => {
    setMinNumber(1);
    setMaxNumber(99);
    Alert.alert("정답을 맞췄습니다", "게임 종료 페이지로 이동합니다", [
      { text: "OK", onPress: () => navigation.navigate("GameOver") },
    ]);
  };

  useEffect(() => {
    console.log("randomNumber: ", randomNumber);
    console.log("excludeNumbers: ", excludeNumbers);
  }, [randomNumber, excludeNumbers]);

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
    flex: 3,
  },
});

export default GamePage;
