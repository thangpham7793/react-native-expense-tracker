import { AddItem, SpendingState } from "./SpendingSlice.types"
import { store } from "./../../app/store"
import {
  spendingSlice,
  selectCategory,
  selectCategoryHistory,
  selectSpentBudget,
  setCategoryBudget,
  addSpendingItem,
} from "./spendingSlice"

//reference: https://github.com/reduxjs/redux-toolkit/blob/master/src/createSlice.test.ts

const { actions, reducer } = spendingSlice

const testState: SpendingState = {
  groceries: {
    spendingHistory: [],
    budget: 100,
  },
  entertainment: { spendingHistory: [], budget: 100 },
  "eating out": { spendingHistory: [], budget: 100 },
  others: { spendingHistory: [], budget: 100 },
  bills: { spendingHistory: [], budget: 100 },
}

const state = store.getState()
state.spending = reducer(state.spending, actions.setTestState(testState))

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

  describe("selectCategory", () => {
    it("should select the correct category", () => {
      const expected = { spendingHistory: [], budget: 100 }
      const selected = selectCategory(state, "eating out")
      expect(selected).toEqual(expected)
    })
  })
})

describe.only("SpendingSlice Actions", () => {
  describe("addSpendingItem", () => {
    it("should add a new item with a new id", () => {
      const payload: AddItem = {
        category: "groceries",
        spendingItem: {
          amount: 20,
          date: new Date("2020-01-01"),
          note: "",
        },
      }

      const newState = reducer(state.spending, actions.addSpendingItem(payload))

      expect(
        selectCategoryHistory({ spending: newState }, "groceries")
      ).toContainEqual({
        ...payload.spendingItem,
        id: `groceries-${new Date("2020-01-01").getTime()}`,
      })
    })
  })
})
