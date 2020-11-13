import React from "react"
import { Button } from "react-native-paper"

interface AppButtonProp {
  content: string
  onPress: () => void
  props?: any
}

export default function AppButton({
  onPress,
  content,
  ...props
}: AppButtonProp) {
  return (
    <Button mode="contained" onPress={onPress} {...props}>
      {content}
    </Button>
  )
}
