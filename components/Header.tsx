import React from "react"
import { TextStyle } from "react-native"
import { Title } from "react-native-paper"

interface HeaderProp {
  content: string
  style?: TextStyle
}

export default function Header({ content, style }: HeaderProp) {
  return (
    <Title style={{ textTransform: "capitalize", ...style }}>{content}</Title>
  )
}
