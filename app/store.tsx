import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../features/counter/counterSlice";
import spendingReducer from "../features/spending/spendingSlice";

export const store = configureStore({
  reducer: {
    spending: spendingReducer,
  },
});
