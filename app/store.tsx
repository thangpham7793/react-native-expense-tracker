import { configureStore } from "@reduxjs/toolkit"
import spendingReducer from "../features/spending/spendingSlice"

export const store = configureStore({
  reducer: {
    spending: spendingReducer,
  },
})

const state = store.getState()

export type AppReduxState = typeof state
