import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import BottomNav from "./components/BottomNav"
import { useSelector } from "react-redux"
import { AppReduxState } from "./app/store"
import Welcome from "./screens/Welcome/Welcome"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import SetBudgets from "./screens/SetBudgets/SetBudgets"
import PickCategories from "./screens/PickCategories/PickCategories"

export type RootStackScreenParams = {
  Welcome: undefined
  "Pick Categories": undefined
  "Set Budgets": undefined
}

export function AppContent() {
  const firstTimeUser = useSelector(
    (state: AppReduxState) => state.spending.firstTimeUser
  )

  const Stack = createStackNavigator<RootStackScreenParams>()

  return firstTimeUser ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"Welcome"} component={Welcome} />
        <Stack.Screen name="Pick Categories" component={PickCategories} />
        <Stack.Screen name="Set Budgets" component={SetBudgets} />
      </Stack.Navigator>
    </NavigationContainer>
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
