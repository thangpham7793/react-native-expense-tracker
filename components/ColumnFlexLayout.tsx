import React from "react"
import { layoutStyles } from "../styles/Layout"
import CenteredContainer from "./CenteredContainer"

interface ColumnFlexLayoutProp {
  children: (JSX.Element | JSX.Element[])[]
  sizeRatio?: number[]
  showDebuggingBorder?: boolean
}

export default function ColumnFlexLayout({
  children,
  sizeRatio,
  showDebuggingBorder = false,
}: ColumnFlexLayoutProp) {
  if (!sizeRatio) {
    sizeRatio = Array(children.length).fill(12 / children.length)
  }

  if (sizeRatio && sizeRatio.length !== children.length) {
    throw new Error("Number of Children must be equal to Number of Parts")
  }

  if (sizeRatio.some((r) => r < 0)) {
    throw new Error("All Ratios must be positive!")
  }

  return (
    <CenteredContainer
      style={showDebuggingBorder ? layoutStyles.debugBorderStyle : undefined}
    >
      {children.map((children, index) => (
        <CenteredContainer
          style={
            showDebuggingBorder ? layoutStyles.debugBorderStyle : undefined
          }
          key={index}
          size={sizeRatio && sizeRatio[index]}
          children={children}
        />
      ))}
    </CenteredContainer>
  )
}
