import React from "react"
import Header from "../../components/Header"
import ColumnFlexLayout from "../../components/ColumnFlexLayout"
import { useSelector } from "react-redux"
import { selectAllSpendingCategoryNames } from "../../features/spending/spendingSlice"
import PickCategoriesForm from "./components/PickCategoriesForm"
import { RootStackParamsList } from "../../AppContent"
import { StackNavigationProp } from "@react-navigation/stack"

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamsList,
  "Pick Categories"
>

interface PickCategoriesProp {
  navigation: WelcomeScreenNavigationProp
}

export default function PickCategories({ navigation }: PickCategoriesProp) {
  const categories = useSelector(selectAllSpendingCategoryNames)

  function navigateToNextScreen() {
    navigation.navigate("Set Budgets")
  }

  return (
    <ColumnFlexLayout
      sizeRatio={[4, 8]}
      children={[
        <Header content="Categories" style={{ fontSize: 30 }} />,
        <PickCategoriesForm
          categories={categories}
          navigateToNextScreen={navigateToNextScreen}
        />,
      ]}
    />
  )
}
