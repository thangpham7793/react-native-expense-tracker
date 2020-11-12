import React from "react"
import { View, Text } from "react-native"
import CenteredContainer from "../../components/CenteredContainer"
import Header from "../../components/Header"
import ColumnFlexLayout from "../../components/ColumnFlexLayout"

export default function SetBudgets() {
  return (
    <ColumnFlexLayout
      children={[
        <Header content="Set Budgets" />,
        <Header content="Set Budgets" />,
        <Header content="Set Budgets" />,
        <Header content="Set Budgets" />,
      ]}
    />
  )
}
