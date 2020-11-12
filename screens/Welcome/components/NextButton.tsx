import React from "react"
import { Button } from "react-native-paper"

interface NextButtonProp {
  onPress: () => void
}

export default function NextButton({ onPress }: NextButtonProp) {
  return (
    <Button mode="contained" onPress={onPress}>
      Set Up My Budgets!
    </Button>
  )
}
