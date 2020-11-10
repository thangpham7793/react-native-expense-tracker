import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  addId,
  calculateTotalSpentBudget,
  compareByDateAscending,
  compareByDateDescending,
  deleteItem,
  updateItem,
} from "./spendingSlice.helpers"

import {
  AddItem,
  DeleteItem,
  UpdateItem,
  SetCategoryBudget,
  SpendingState,
  Category,
  SpendingItem,
  CategoryState,
} from "./SpendingSlice.types"

export const initialState: SpendingState = {
  groceries: { spendingHistory: [], budget: 0 },
  entertainment: { spendingHistory: [], budget: 0 },
  "eating out": { spendingHistory: [], budget: 0 },
  others: { spendingHistory: [], budget: 0 },
  bills: { spendingHistory: [], budget: 0 },
}

export const spendingSlice = createSlice({
  name: "spending",
  initialState,
  reducers: {
    setSpendingState: (state, action: PayloadAction<SpendingState>) => {
      return { ...state, ...action.payload }
    },

    setCategoryBudget: (state, action: PayloadAction<SetCategoryBudget>) => {
      const { category, budget } = action.payload
      state[category].budget = budget
    },

    addSpendingItem: {
      reducer(state, action: PayloadAction<AddItem>) {
        const { category, spendingItem } = action.payload
        state[category].spendingHistory.push(spendingItem)
      },

      prepare(newItem: AddItem) {
        const item = addId(newItem)
        return {
          payload: {
            ...item,
          },
        }
      },
    },

    deleteSpendingItem: (state, action: PayloadAction<DeleteItem>) => {
      const { category, spendingItemId } = action.payload
      deleteItem(state[category].spendingHistory, spendingItemId)
    },

    updateSpendingItem: (state, action: PayloadAction<UpdateItem>) => {
      const { category, updatedSpendingItem } = action.payload
      updateItem(state[category].spendingHistory, updatedSpendingItem)
    },
  },
})

//reducers
export const {
  addSpendingItem,
  deleteSpendingItem,
  updateSpendingItem,
  setCategoryBudget,
  setSpendingState,
} = spendingSlice.actions

//selectors
export const selectCategory = (state: any, category: Category): CategoryState =>
  state.spending[category]

export const selectCategoryHistory = (
  state: any,
  category: Category
): SpendingItem[] => state.spending[category].spendingHistory

export const selectSpentBudget = (state: any, category: Category): number => {
  return calculateTotalSpentBudget(selectCategoryHistory(state, category))
}

export const selectAllSpendingCategories = (state: any): Category[] =>
  Object.keys(state.spending)

export const selectAllHistoryUnsorted = (state: any): SpendingItem[] => {
  return selectAllSpendingCategories(state).flatMap((category) =>
    selectCategoryHistory(state, category)
  )
}

export const selectAllHistorySortedByDateAscending = (
  state: any
): SpendingItem[] => {
  return selectAllHistoryUnsorted(state).sort((a, b) =>
    compareByDateAscending(a.date, b.date)
  )
}

export const selectAllHistorySortedByDateDescending = (
  state: any
): SpendingItem[] => {
  return selectAllHistoryUnsorted(state).sort((a, b) =>
    compareByDateDescending(a.date, b.date)
  )
}

export const selectTotalSpentBudget = (state: any): number => {
  return calculateTotalSpentBudget(selectAllHistoryUnsorted(state))
}

export default spendingSlice.reducer
