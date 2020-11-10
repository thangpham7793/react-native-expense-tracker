import {
  selectCategory,
  selectCategoryHistory,
  selectSpentBudget,
} from "./spendingSlice"

const state = {
  spending: {
    groceries: {
      spendingHistory: [
        {
          amount: 20,
          date: new Date("2020-01-02"),
          note: "Testing",
          id: `entertainment-${new Date("2020-01-02").getTime()}`,
        },
        {
          amount: 20,
          date: new Date("2020-01-03"),
          note: "Testing",
          id: `entertainment-${new Date("2020-01-03").getTime()}`,
        },
        {
          amount: 20,
          date: new Date("2020-01-04"),
          note: "Testing",
          id: `entertainment-${new Date("2020-01-04").getTime()}`,
        },
      ],
      budget: 100,
    },
    entertainment: { spendingHistory: [], budget: 100 },
    "eating out": { spendingHistory: [], budget: 100 },
    others: { spendingHistory: [], budget: 100 },
    bills: { spendingHistory: [], budget: 100 },
  },
}
describe("SpendingSlice Selectors", () => {
  describe("selectCategory", () => {
    it("should select the correct category", () => {
      const selected = selectCategory(state, "groceries")
      expect(selected.budget).toEqual(100)
      expect(selected.spendingHistory).toEqual(
        state.spending.groceries.spendingHistory
      )
    })
  })

  describe("selectCategoryHistory", () => {
    it("should select all the history of a category", () => {
      const selected = selectCategoryHistory(state, "groceries")
      expect(selected).toEqual(state.spending.groceries.spendingHistory)
    })
  })

  describe("selectSpentBudget", () => {
    it("should calculate money spent on a category", () => {
      const selected = selectSpentBudget(state, "groceries")
      expect(selected).toEqual(60)
    })
  })
})
