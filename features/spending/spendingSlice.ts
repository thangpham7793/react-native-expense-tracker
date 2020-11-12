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
  AddCategory,
  DeleteCategory,
  UpdateCategory,
  Categories,
  CategoriesWithBudgetOnly,
} from "./SpendingSlice.types"

export const emptyState: SpendingState = {
  firstTimeUser: true,
  categories: {
    groceries: { spendingHistory: [], weeklyBudget: 0 },
    entertainment: { spendingHistory: [], weeklyBudget: 0 },
    "eating out": { spendingHistory: [], weeklyBudget: 0 },
    others: { spendingHistory: [], weeklyBudget: 0 },
    bills: { spendingHistory: [], weeklyBudget: 0 },
  },
}

export const spendingSlice = createSlice({
  name: "spending",
  initialState: emptyState,
  reducers: {
    setSpendingState: {
      reducer(state, action: PayloadAction<SpendingState>) {
        return { ...state, ...action.payload }
      },

      prepare(categories: CategoriesWithBudgetOnly) {
        const categoryNames = Object.keys(categories)

        categoryNames.forEach(
          (categoryName) => (categories[categoryName].spendingHistory = [])
        )

        return {
          payload: {
            firstTimeUser: false,
            categories: categories as Categories,
          },
        }
      },
    },

    setCategoryBudget: (state, action: PayloadAction<SetCategoryBudget>) => {
      const { category, weeklyBudget } = action.payload
      state.categories[category].weeklyBudget = weeklyBudget
    },

    addSpendingItem: {
      reducer(state, action: PayloadAction<AddItem>) {
        const { category, spendingItem } = action.payload
        state.categories[category].spendingHistory.push(spendingItem)
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
      deleteItem(state.categories[category].spendingHistory, spendingItemId)
    },

    updateSpendingItem: (state, action: PayloadAction<UpdateItem>) => {
      const { category, updatedSpendingItem } = action.payload
      updateItem(
        state.categories[category].spendingHistory,
        updatedSpendingItem
      )
    },

    addCategory: (state, action: PayloadAction<AddCategory>) => {
      const { category, weeklyBudget } = action.payload
      state.categories[category] = { spendingHistory: [], weeklyBudget }
    },

    deleteCategory: (state, action: PayloadAction<DeleteCategory>) => {
      delete state.categories[action.payload.category]
    },

    updateCategory: (state, action: PayloadAction<UpdateCategory>) => {
      const { currentCategory, updatedCategory, updatedBudget } = action.payload

      if (updatedBudget) {
        state.categories[currentCategory].weeklyBudget = updatedBudget
      }

      if (currentCategory !== updatedCategory) {
        state.categories[updatedCategory] = state.categories[currentCategory]
        delete state.categories[currentCategory]
      }
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
export const selectCategoryState = (
  state: any,
  category: Category
): CategoryState => state.spending.categories[category]

export const selectCategoryHistory = (
  state: any,
  category: Category
): SpendingItem[] => state.spending.categories[category].spendingHistory

export const selectSpentBudgetByCategory = (
  state: any,
  category: Category
): number => {
  return calculateTotalSpentBudget(selectCategoryHistory(state, category))
}

export const selectAllSpendingCategoryNames = (state: any): Category[] =>
  Object.keys(state.spending.categories)

export const selectAllHistoryUnsorted = (state: any): SpendingItem[] => {
  return selectAllSpendingCategoryNames(state).flatMap((category) =>
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
