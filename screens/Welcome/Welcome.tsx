import React from "react"
import { Image } from "react-native"
import { Button } from "react-native-paper"

import Header from "../../components/Header"
import CenteredContainer from "../../components/CenteredContainer"

import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "../../AppContent"

// https://reactnavigation.org/docs/typescript/

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  "Welcome"
>

interface WelcomeProps {
  navigation: WelcomeScreenNavigationProp
}

export default function Welcome({ navigation }: WelcomeProps) {
  return (
    <CenteredContainer>
      <CenteredContainer size={4}>
        <Header content="stay on top of your money!" />
      </CenteredContainer>
      <CenteredContainer size={4}>
        <Image
          source={require("../../assets/wallet.png")}
          style={{ width: 400, height: 400 }}
        />
      </CenteredContainer>
      <CenteredContainer size={4}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Pick Categories")}
        >
          Set Up My Budgets!
        </Button>
      </CenteredContainer>
    </CenteredContainer>
  )
}
