import React from "react"
import { View, Text } from "react-native"
import Header from "../../components/Header"
import FlexLayout from "../../components/FlexLayout"

export default function SetBudgets() {
  return (
    <FlexLayout
      children={[
        <Header content="Set Budgets" />,
        <Header content="Set Budgets" />,
        <Header content="Set Budgets" />,
        <Header content="Set Budgets" />,
      ]}
    />
  )
}
