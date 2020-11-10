import { store } from "./../../app/store"
import {
  selectCategory,
  selectCategoryHistory,
  selectSpentBudget,
} from "./spendingSlice"

const state = store.getState()
state.spending = {
  groceries: {
    spendingHistory: [],
    budget: 100,
  },
  entertainment: { spendingHistory: [], budget: 100 },
  "eating out": { spendingHistory: [], budget: 100 },
  others: { spendingHistory: [], budget: 100 },
  bills: { spendingHistory: [], budget: 100 },
}

describe("SpendingSlice Selectors", () => {
  describe("selectCategory", () => {
    it("should select the correct category", () => {
      const expected = { spendingHistory: [], budget: 100 }
      const selected = selectCategory(state, "eating out")
      expect(selected).toEqual(expected)
    })
  })

  describe("selectCategoryHistory", () => {
    it("should select the correct category", () => {
      const expected = { spendingHistory: [], budget: 100 }
      const selected = selectCategory(state, "eating out")
      expect(selected).toEqual(expected)
    })
  })

  describe("selectSpentBudget", () => {
    it("should select the correct category", () => {
      const expected = { spendingHistory: [], budget: 100 }
      const selected = selectCategory(state, "eating out")
      expect(selected).toEqual(expected)
    })
  })
})
