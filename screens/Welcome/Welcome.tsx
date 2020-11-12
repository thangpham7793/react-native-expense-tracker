//lib
import React from "react"

//common
import Header from "../../components/Header"

//types
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackScreenParams } from "../../AppContent"

//specific
import AppLogo from "./components/AppLogo"
import ColumnFlexLayout from "../../components/ColumnFlexLayout"
import NextButton from "../../components/NextButton"

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
    <ColumnFlexLayout
      children={[
        <Header content="stay on top of your money!" />,
        <AppLogo />,
        <NextButton
          onPress={() => navigation.navigate("Pick Categories")}
          content="Set Spending Categories"
        />,
      ]}
    />
  )
}
