import React from "react"
import { View, Text } from "react-native"
import NextButton from "../../../components/NextButton"
import { BaseCategory } from "../../../features/spending/SpendingSlice.types"

interface PickCategoriesFormProp {
  categories: BaseCategory[] | string[]
  navigateToNextScreen: () => void
}

export default function PickCategoriesForm({
  categories,
  navigateToNextScreen,
}: PickCategoriesFormProp) {
  return (
    <View>
      <Text>{JSON.stringify(categories)}</Text>
      <NextButton content="Set Budgets" onPress={navigateToNextScreen} />
    </View>
  )
}
