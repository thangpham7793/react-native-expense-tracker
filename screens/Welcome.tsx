import React from "react"
import { Image, View } from "react-native"
import { Button, Title } from "react-native-paper"
import CenteredContainer from "../components/CenteredContainer"

export default function Welcome() {
  return (
    <CenteredContainer size={12}>
      <CenteredContainer size={4}>
        <Title style={{ textTransform: "capitalize" }}>
          stay on top of your money
        </Title>
      </CenteredContainer>
      <CenteredContainer size={4}>
        <Image
          source={require("../assets/wallet.png")}
          style={{ width: 400, height: 400 }}
        />
      </CenteredContainer>
      <CenteredContainer size={4}>
        <Button mode="contained">Set Up My Budgets!</Button>
      </CenteredContainer>
    </CenteredContainer>
  )
}
