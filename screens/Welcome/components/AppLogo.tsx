import React from "react"
import { Image } from "react-native"

export default function AppLogo() {
  return (
    <Image
      source={require("../../../assets/wallet.png")}
      style={{ width: 400, height: 400 }}
    />
  )
}
