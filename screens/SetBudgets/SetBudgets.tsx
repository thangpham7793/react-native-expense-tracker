import React from "react"
import { View, Text } from "react-native"
import CenteredContainer from "../../components/CenteredContainer"
import Header from "../../components/Header"
import ThreePartColumnFlexLayout from "../../components/ThreePartColumnFlexLayout"

export default function SetBudgets() {
  return (
    <ThreePartColumnFlexLayout
      children={[
        <Header content="Set Budgets" />,
        <Header content="Set Budgets" />,
        <Header content="Set Budgets" />,
      ]}
    />
  )
}
