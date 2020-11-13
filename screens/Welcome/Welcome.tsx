//lib
import React from "react"

//common
import Header from "../../components/Header"

//types
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackScreenParams } from "../../AppContent"

//specific
import AppLogo from "./components/AppLogo"
import FlexLayout from "../../components/FlexLayout"
import { Button } from "react-native-paper"

// https://reactnavigation.org/docs/typescript/

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackScreenParams,
  "Welcome"
>

interface WelcomeProps {
  navigation: WelcomeScreenNavigationProp
}

export default function Welcome({ navigation }: WelcomeProps) {
  return (
    <FlexLayout
      children={[
        <Header content="stay on top of your money!" />,
        <AppLogo />,
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Pick Categories")}
        >
          Set Spending Categories
        </Button>,
      ]}
    />
  )
}
