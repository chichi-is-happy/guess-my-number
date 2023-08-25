import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { guessList, answerNumber } from "../recoilState/state";

const GamePage = ({ navigation }) => {
  const [list, setList] = useRecoilState(guessList);
  const answer = useRecoilValue(answerNumber);

  // 컴퓨터가 Math.random()으로 함수 실행 시마다 숫자 랜덤 생성
  const chooseNumber = () => {
    const randomNumber = parseInt(Math.floor(Math.random() * 99) + 1);
    setList((prev) => [
      ...prev,
      {
        number: randomNumber,
        key: Math.random().toString(),
        count: prev.length + 1,
      },
    ]);
  };

  const nowGuessData = list.length && list[list.length - 1];

  useEffect(() => {
    console.log("list updated: ", list);
  }, [list]);
  return (
    <>
      <View style={styles.container}>
        <Text>내가 낸 숫자 : {answer}</Text>

        {/* <Text>이번에 컴퓨터가 제시한 숫자 : {nowGuessData.number}</Text>
        <Text>이번에 컴퓨터가 제시한 횟수 : {nowGuessData.count}</Text> */}
        <Button title="시작" onPress={chooseNumber}></Button>
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
