import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, Text } from "react-native"
import BottomNav from "./components/BottomNav"
import { useSelector } from "react-redux"
import { AppReduxState } from "./app/store"
import Welcome from "./screens/Welcome"

export function AppContent() {
  const firstTimeUser = useSelector(
    (state: AppReduxState) => state.spending.firstTimeUser
  )

  return firstTimeUser ? (
    <Welcome />
  ) : (
    <View style={styles.container}>
      <StatusBar />
      <BottomNav />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
