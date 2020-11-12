import React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import CenteredContainer from "./CenteredContainer"

interface ThreePartColumnFlexLayoutProp {
  children: (JSX.Element | JSX.Element[])[]
  sizeRatio?: number[]
  showBorder?: boolean
}

export default function ThreePartColumnFlexLayout({
  children,
  sizeRatio = [4, 4, 4],
  showBorder = false,
}: ThreePartColumnFlexLayoutProp) {
  const borderStyle: ViewStyle = { borderColor: "red", borderWidth: 1 }

  return (
    <CenteredContainer style={showBorder ? borderStyle : undefined}>
      {children.map((children, index) => (
        <CenteredContainer
          style={showBorder ? borderStyle : undefined}
          key={index}
          size={sizeRatio[index]}
          children={children}
        />
      ))}
    </CenteredContainer>
  )
}
