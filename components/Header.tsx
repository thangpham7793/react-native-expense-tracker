import React from "react"
import { TextStyle } from "react-native"
import { Title } from "react-native-paper"

interface HeaderProp {
  content: string
  style?: TextStyle
}

export default function Header({ content, style }: HeaderProp) {
  //TODO: extract this to styles folder
  return (
    <Title style={{ textTransform: "capitalize", ...style }}>{content}</Title>
  )
}
