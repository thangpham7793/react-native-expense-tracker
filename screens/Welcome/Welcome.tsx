//lib
import React from "react"

//common
import Header from "../../components/Header"
import CenteredContainer from "../../components/CenteredContainer"

//types
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "../../AppContent"

//specific
import AppLogo from "./components/AppLogo"
import NextButton from "./components/NextButton"
import ColumnFlexLayout from "../../components/ColumnFlexLayout"

// https://reactnavigation.org/docs/typescript/

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  "Welcome"
>

interface WelcomeProps {
  navigation: WelcomeScreenNavigationProp
}

export default function Welcome({ navigation }: WelcomeProps) {
  function navigateToNextScreen() {
    navigation.navigate("Pick Categories")
  }

  return (
    <ColumnFlexLayout
      children={[
        <Header content="stay on top of your money!" />,
        <AppLogo />,
        <NextButton onPress={navigateToNextScreen} />,
      ]}
    />
  )
}
