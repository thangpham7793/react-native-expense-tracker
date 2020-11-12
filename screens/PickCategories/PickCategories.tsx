import React from "react"
import { View, Text } from "react-native"
import CenteredContainer from "../../components/CenteredContainer"
import Header from "../../components/Header"
import ThreePartColumnFlexLayout from "../../components/ThreePartColumnFlexLayout"

export default function PickCategories() {
  return (
    <ThreePartColumnFlexLayout
      children={[
        <Header content="Categories" style={{ fontSize: 30 }} />,
        <Header content="Pick Categories" />,
        <Header content="Pick Categories" />,
      ]}
    />
  )
}
