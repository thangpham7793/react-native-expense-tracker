import React from "react"
import { View, ViewStyle } from "react-native"
import { layoutStyles } from "../styles/Layout"

interface CenteredContainerProps {
  children: JSX.Element | JSX.Element[]
  style?: ViewStyle
  size?: number
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
}

export default function CenteredContainer({
  children,
  style,
  size = 12,
  flexDirection = "column",
}: CenteredContainerProps) {
  const styles: ViewStyle = {
    ...layoutStyles.centered,
    flexDirection,
    flex: size / 12,
    width: "100%",
    ...style,
  }

  return <View style={styles}>{children}</View>
}
