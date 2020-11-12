import { ViewStyle } from "react-native"

interface Layout {
  [key: string]: ViewStyle
}

export const layoutStyles: Layout = {
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  debugBorderStyle: {
    borderColor: "red",
    borderWidth: 1,
  },
}
