import React from "react"
import { Button } from "react-native-paper"

interface NextButtonProp {
  content: string
  onPress: () => void
}

export default function NextButton({ onPress, content }: NextButtonProp) {
  return (
    <Button mode="contained" onPress={onPress}>
      {content}
    </Button>
  )
}
