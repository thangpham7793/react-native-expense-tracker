import React from "react"
import { Provider } from "react-redux"
import { Provider as PaperProvider } from "react-native-paper"
import { store } from "./app/store"
import { AppContent } from "./AppContent"

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </Provider>
  )
}
