import React from "react"
import Header from "../../components/Header"
import FlexLayout from "../../components/FlexLayout"
import { useSelector } from "react-redux"
import { selectAllSpendingCategoryNames } from "../../features/spending/spendingSlice"
import PickCategoriesForm from "./components/PickCategoriesForm"
import { RootStackScreenParams } from "../../AppContent"
import { StackNavigationProp } from "@react-navigation/stack"

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackScreenParams,
  "Pick Categories"
>

interface PickCategoriesProp {
  navigation: WelcomeScreenNavigationProp
}

export default function PickCategories({ navigation }: PickCategoriesProp) {
  const categories = useSelector(selectAllSpendingCategoryNames)

  return (
    <FlexLayout
      sizeRatio={[4, 8]}
      children={[
        <Header content="Categories" style={{ fontSize: 30 }} />,
        <PickCategoriesForm
          categories={categories}
          navigateToNextScreen={() => navigation.navigate("Set Budgets")}
        />,
      ]}
    />
  )
}
