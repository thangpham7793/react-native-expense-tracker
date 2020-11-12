import React from "react"
import { Title } from "react-native-paper"

export default function Header({ content }: { content: string }) {
  return <Title style={{ textTransform: "capitalize" }}>{content}</Title>
}
