import { AppReduxState } from "./../../app/store"
import { BaseCategory } from "./SpendingSlice.types"
import {
  selectCategoryState,
  selectCategoryHistory,
  selectSpentBudgetByCategory,
  selectTotalSpentBudget,
  selectAllSpendingCategoryNames,
  selectAllHistorySortedByDateAscending,
  selectAllHistorySortedByDateDescending,
} from "./spendingSlice"
import { generateGivenShouldTestDescription } from "../../utils/generateGivenShouldTestDescription"

const state: Partial<AppReduxState> = {
  spending: {
    firstTimeUser: false,
    categories: {
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
        weeklyBudget: 100,
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
        weeklyBudget: 100,
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
        weeklyBudget: 100,
      },
      others: { spendingHistory: [], weeklyBudget: 100 },
      bills: { spendingHistory: [], weeklyBudget: 100 },
    },
  },
}

describe("SpendingSlice Selectors", () => {
  describe("selectCategoryState", () => {
    it(
      generateGivenShouldTestDescription({
        given: "a valid category name",
        should: "return the budget and history of said category",
      }),
      () => {
        const selected = selectCategoryState(state, "groceries")
        expect(selected.weeklyBudget).toEqual(100)

        if (state.spending) {
          expect(selected.spendingHistory).toEqual(
            state.spending.categories.groceries.spendingHistory
          )
        }
      }
    )
  })

  describe("selectCategoryHistory", () => {
    it(
      generateGivenShouldTestDescription({
        given: "a valid category name",
        should: "return the history of said category",
      }),
      () => {
        const selected = selectCategoryHistory(state, "groceries")

        if (state.spending) {
          expect(selected).toEqual(
            state.spending.categories.groceries.spendingHistory
          )
        }
      }
    )
  })

  describe("selectSpentBudgetByCategory", () => {
    it(
      generateGivenShouldTestDescription({
        given: "a valid category name",
        should: "calculate the total amount spent on said category",
      }),
      () => {
        const selected = selectSpentBudgetByCategory(state, "groceries")
        expect(selected).toEqual(60)
      }
    )
  })

  describe("selectAllHistorySortedByDateAscending", () => {
    it(
      generateGivenShouldTestDescription({
        when: "called",
        should: "get all records and sorted by the latest date",
      }),
      () => {
        const selected = selectAllHistorySortedByDateAscending(state)
        expect(selected.length).toEqual(5)
        expect(selected[0].date).toEqual(new Date("2020-01-05"))
        expect(selected[4].date).toEqual(new Date("2020-01-01"))
      }
    )
  })

  describe("selectAllHistorySortedByDateDescending", () => {
    it(
      generateGivenShouldTestDescription({
        when: "called",
        should: "get all records and sorted by the oldest date",
      }),
      () => {
        const selected = selectAllHistorySortedByDateDescending(state)
        expect(selected.length).toEqual(5)
        expect(selected[0].date).toEqual(new Date("2020-01-01"))
        expect(selected[4].date).toEqual(new Date("2020-01-05"))
      }
    )
  })

  describe("selectAllSpendingCategoryNames", () => {
    it(
      generateGivenShouldTestDescription({
        when: "called",
        should: "get all the spending categories",
      }),
      () => {
        const selected = selectAllSpendingCategoryNames(state)

        const expected: BaseCategory[] = [
          "bills",
          "eating out",
          "entertainment",
          "groceries",
          "others",
        ]

        selected.forEach((category) => expect(expected).toContain(category))
      }
    )
  })

  describe("selectTotalSpentBudget", () => {
    it(
      generateGivenShouldTestDescription({
        when: "called",
        should: "calculate all spent budget",
      }),
      () => {
        const selected = selectTotalSpentBudget(state)
        expect(selected).toEqual(140)
      }
    )
  })
})
