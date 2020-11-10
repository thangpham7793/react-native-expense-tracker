import {
  AddItem,
  DeleteItem,
  UpdateItem,
  SpendingState,
  SetCategoryBudget,
} from "./SpendingSlice.types"
import { spendingSlice, initialState } from "./spendingSlice"
const { actions, reducer } = spendingSlice

//reference: https://github.com/reduxjs/redux-toolkit/blob/master/src/createSlice.test.ts

const initialSpendingState: SpendingState = {
  groceries: {
    spendingHistory: [],
    budget: 100,
  },
  entertainment: {
    spendingHistory: [
      {
        amount: 20,
        date: new Date("2020-01-02"),
        note: "To be Deleted",
        id: `entertainment-${new Date("2020-01-02").getTime()}`,
      },
    ],
    budget: 100,
  },
  "eating out": {
    spendingHistory: [
      {
        amount: 20,
        date: new Date("2020-01-03"),
        note: "To be Updated",
        id: `eating out-${new Date("2020-01-03").getTime()}`,
      },
    ],
    budget: 100,
  },
  others: { spendingHistory: [], budget: 100 },
  bills: { spendingHistory: [], budget: 100 },
}

describe("SpendingSlice Actions", () => {
  describe("setinitialSpendingState", () => {
    it("should initialise the spendingSlice state", () => {
      const newState = reducer(
        initialState,
        actions.setSpendingState(initialSpendingState)
      )
      expect(newState).toEqual(initialSpendingState)
    })
  })

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

      const expected = {
        ...payload.spendingItem,
        id: `groceries-${new Date("2020-01-01").getTime()}`,
      }

      const newState = reducer(
        initialSpendingState,
        actions.addSpendingItem(payload)
      )

      expect(newState.groceries.spendingHistory).toContainEqual(expected)
    })
  })

  describe("deleteSpendingItem", () => {
    it("should delete an item by a given id", () => {
      const payload: DeleteItem = {
        category: "entertainment",
        spendingItemId: `entertainment-${new Date("2020-01-02").getTime()}`,
      }

      const newState = reducer(
        initialSpendingState,
        actions.deleteSpendingItem(payload)
      )

      expect(initialSpendingState.entertainment.spendingHistory.length).toBe(1)
      expect(newState.entertainment.spendingHistory.length).toBe(0)
    })
  })

  describe("updateSpendingItem", () => {
    it("should update an item by a given id", () => {
      const payload: UpdateItem = {
        category: "eating out",
        updatedSpendingItem: {
          amount: 80,
          date: new Date("2020-01-03"),
          note: "Updated Successfully!",
          id: `eating out-${new Date("2020-01-03").getTime()}`,
        },
      }

      const newState = reducer(
        initialSpendingState,
        actions.updateSpendingItem(payload)
      )

      expect(newState["eating out"].spendingHistory).toContainEqual(
        payload.updatedSpendingItem
      )
    })
  })

  describe("setCategoryBudget", () => {
    it("should update an item by a given id", () => {
      const payload: SetCategoryBudget = {
        category: "eating out",
        budget: 120,
      }

      const newState = reducer(
        initialSpendingState,
        actions.setCategoryBudget(payload)
      )

      expect(initialSpendingState["eating out"].budget).toBe(100)
      expect(newState["eating out"].budget).toBe(120)
    })
  })
})
