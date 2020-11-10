import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import {
  decrement,
  increment,
  selectCount,
} from "./features/counter/counterSlice";

import { useDispatch, useSelector } from "react-redux";

export function AppContent() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>The Current Count is {useSelector(selectCount)}</Text>
      <Text>{"Hello"}</Text>
      <Button title="Add 1" onPress={() => dispatch(increment())} />
      <Button title="Minus 1" onPress={() => dispatch(decrement())} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
