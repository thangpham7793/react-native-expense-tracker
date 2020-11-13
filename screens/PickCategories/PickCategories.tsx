import React from "react"
import Header from "../../components/Header"
import FlexLayout from "../../components/FlexLayout"
import PickCategoriesForm from "./components/PickCategoriesForm"
import { RootStackScreenParams } from "../../AppContent"
import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

type PickCategoriesNavigationProp = StackNavigationProp<
  RootStackScreenParams,
  "Pick Categories"
>

type PickCategoriesRouteProp = RouteProp<
  RootStackScreenParams,
  "Pick Categories"
>

interface PickCategoriesProp {
  navigation: PickCategoriesNavigationProp
  route: PickCategoriesRouteProp
}

export default function PickCategories({ navigation }: PickCategoriesProp) {
  return (
    <FlexLayout
      sizeRatio={[2, 10]}
      children={[
        <Header content="Categories" style={{ fontSize: 30 }} />,
        <PickCategoriesForm
          navigateToNextScreen={() => navigation.navigate("Set Budgets")}
        />,
      ]}
    />
  )
}
