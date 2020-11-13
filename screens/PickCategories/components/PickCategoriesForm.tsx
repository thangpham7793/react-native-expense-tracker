import React, { useState } from "react"
import { Button, TextInput } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { AppReduxState } from "../../../app/store"
import CenteredContainer from "../../../components/CenteredContainer"
import FlexLayout from "../../../components/FlexLayout"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import {
  setSpendingState,
  selectUserInputErrors,
} from "../../../features/spending/spendingSlice"
import {
  UserInputCategories,
  Category,
  UserInputErrors,
} from "../../../features/spending/SpendingSlice.types"
import capitalise from "../../../utils/capitalise"

interface PickCategoriesFormProp {
  navigateToAppScreen: () => void
}

function validateBudget(budget: string) {
  return budget.length > 0 && parseFloat(budget) > 0
}

function canSubmit(errors: UserInputErrors) {
  return !Object.values(errors).some(
    (error) => error === true || error === undefined
  )
}

export default function PickCategoriesForm({
  navigateToAppScreen,
}: PickCategoriesFormProp) {
  const [initialCategories, setInitialCategories] = useState<
    UserInputCategories
  >(useSelector((state: AppReduxState) => state.spending.categories))

  const [errors, setErrors] = useState<UserInputErrors>(
    useSelector(selectUserInputErrors)
  )

  const dispatch = useDispatch()

  function onBudgetChanged(text: string, category: Category) {
    setInitialCategories({
      ...initialCategories,
      [category]: { weeklyBudget: text },
    })

    setErrors({
      ...errors,
      [category]: !validateBudget(text),
    })
  }

  function intialiseStateAndProceedToApp() {
    dispatch(setSpendingState(initialCategories))
  }

  return (
    <FlexLayout sizeRatio={[9, 3]}>
      {Object.keys(initialCategories).map((category) => {
        return (
          <KeyboardAwareScrollView key={category} style={{ width: "100%" }}>
            <CenteredContainer>
              <TextInput
                style={{ width: "100%" }}
                label={capitalise(category)}
                value={`${initialCategories[category].weeklyBudget}`}
                onChangeText={(text) => onBudgetChanged(text, category)}
                error={errors[category]}
              />
            </CenteredContainer>
          </KeyboardAwareScrollView>
        )
      })}
      <Button
        mode="contained"
        onPress={intialiseStateAndProceedToApp}
        disabled={!canSubmit(errors)}
      >
        Set Budgets
      </Button>
    </FlexLayout>
  )
}
