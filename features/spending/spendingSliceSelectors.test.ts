import { BaseCategory } from "./SpendingSlice.types"
import {
  selectCategory,
  selectCategoryHistory,
  selectSpentBudget,
  selectTotalSpentBudget,
  selectAllSpendingCategories,
  selectAllHistorySortedByDateAscending,
  selectAllHistorySortedByDateDescending,
} from "./spendingSlice"

const state = {
  spending: {
    groceries: {
      spendingHistory: [
        {
          amount: 20,
          date: new Date("2020-01-03"),
          note: "Testing",
          id: `groceries-${new Date("2020-01-03").getTime()}`,
        },
        {
          amount: 20,
          date: new Date("2020-01-05"),
          note: "Latest",
          id: `groceries-${new Date("2020-01-05").getTime()}`,
        },
        {
          amount: 20,
          date: new Date("2020-01-01"),
          note: "Oldest",
          id: `groceries-${new Date("2020-01-01").getTime()}`,
        },
      ],
      budget: 100,
    },
    entertainment: {
      spendingHistory: [
        {
          amount: 40,
          date: new Date("2020-01-04"),
          note: "Testing",
          id: `entertainment-${new Date("2020-01-04").getTime()}`,
        },
      ],
      budget: 100,
    },
    "eating out": {
      spendingHistory: [
        {
          amount: 40,
          date: new Date("2020-01-02"),
          note: "Testing",
          id: `eating out-${new Date("2020-01-02").getTime()}`,
        },
      ],
      budget: 100,
    },
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

  describe("selectAllHistorySortedByDateAscending", () => {
    it("should get all records and sort them by the latest date", () => {
      const selected = selectAllHistorySortedByDateAscending(state)
      expect(selected.length).toEqual(5)
      expect(selected[0].date).toEqual(new Date("2020-01-05"))
      expect(selected[4].date).toEqual(new Date("2020-01-01"))
    })
  })

  describe("selectAllHistorySortedByDateDescending", () => {
    it("should get all records and sort them by the oldest date", () => {
      const selected = selectAllHistorySortedByDateDescending(state)
      expect(selected.length).toEqual(5)
      expect(selected[0].date).toEqual(new Date("2020-01-01"))
      expect(selected[4].date).toEqual(new Date("2020-01-05"))
    })
  })

  describe("selectAllSpendingCategories", () => {
    it("should get all the spending categories", () => {
      const selected = selectAllSpendingCategories(state)

      const expected: BaseCategory[] = [
        "bills",
        "eating out",
        "entertainment",
        "groceries",
        "others",
      ]

      selected.forEach((category) => expect(expected).toContain(category))
    })
  })

  describe("selectTotalSpentBudget", () => {
    it("should calculate all spent budget", () => {
      const selected = selectTotalSpentBudget(state)
      expect(selected).toEqual(140)
    })
  })
})
