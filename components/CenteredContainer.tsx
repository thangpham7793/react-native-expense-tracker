import React from "react"
import { View, ViewStyle } from "react-native"
import { layoutStyles } from "../styles/Layout"

interface CenteredContainerProps {
  children: JSX.Element | JSX.Element[]
  style?: ViewStyle
  size?: number
}

export default function CenteredContainer({
  children,
  style,
  size = 12,
}: CenteredContainerProps) {
  const styles = {
    ...layoutStyles.centered,
    flex: size / 12,
    width: "100%",
    ...style,
  }

  return <View style={styles}>{children}</View>
}
