import {
  AddItem,
  DeleteItem,
  UpdateItem,
  SpendingState,
  SetCategoryBudget,
  AddCategory,
  DeleteCategory,
  UpdateCategory,
} from "./SpendingSlice.types"

import {
  spendingSlice,
  initialState as emptyState,
  selectAllSpendingCategoryNames,
} from "./spendingSlice"

import { generateGivenShouldTestDescription } from "../../utils/generateGivenShouldTestDescription"

const { actions, reducer } = spendingSlice

//reference: https://github.com/reduxjs/redux-toolkit/blob/master/src/createSlice.test.ts

const initialState: SpendingState = {
  firstTimeUser: true,
  categories: {
    groceries: {
      spendingHistory: [
        {
          amount: 20,
          date: new Date("2020-01-02"),
          note: "Testing",
          id: `groceries-${new Date("2020-01-02").getTime()}`,
        },
      ],
      weeklyBudget: 100,
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
      weeklyBudget: 100,
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
      weeklyBudget: 100,
    },
    others: { spendingHistory: [], weeklyBudget: 100 },
    bills: { spendingHistory: [], weeklyBudget: 100 },
  },
}

describe("SpendingSlice Actions", () => {
  describe("setSpendingState", () => {
    it(
      generateGivenShouldTestDescription({
        given: "an object matching the SpendingState Type",
        should: "set the state as said object",
      }),
      () => {
        const newState = reducer(
          emptyState,
          actions.setSpendingState(initialState)
        )
        expect(newState).toEqual(initialState)
      }
    )
  })

  describe("addSpendingItem", () => {
    it(
      generateGivenShouldTestDescription({
        given: "a valid category and a new spending item object",
        should:
          "create a new spending item with a new id in the said category history",
      }),
      () => {
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

        const newState = reducer(initialState, actions.addSpendingItem(payload))

        expect(newState.categories.groceries.spendingHistory).toContainEqual(
          expected
        )
      }
    )
  })

  describe("deleteSpendingItem", () => {
    it(
      generateGivenShouldTestDescription({
        given: "a valid id",
        should: "delete the item with said id",
      }),
      () => {
        const payload: DeleteItem = {
          category: "entertainment",
          spendingItemId: `entertainment-${new Date("2020-01-02").getTime()}`,
        }

        const newState = reducer(
          initialState,
          actions.deleteSpendingItem(payload)
        )

        expect(
          initialState.categories.entertainment.spendingHistory.length
        ).toBe(1)
        expect(newState.categories.entertainment.spendingHistory.length).toBe(0)
      }
    )
  })

  describe("updateSpendingItem", () => {
    it(
      generateGivenShouldTestDescription({
        given:
          "a valid category and an updated spending item object with an existing id",
        should: "update the item with the given id",
      }),
      () => {
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
          initialState,
          actions.updateSpendingItem(payload)
        )

        expect(
          newState.categories["eating out"].spendingHistory
        ).toContainEqual(payload.updatedSpendingItem)
      }
    )
  })

  describe("setCategoryBudget", () => {
    it(
      generateGivenShouldTestDescription({
        given: "a valid category and new budget",
        should: "update the category budget",
      }),
      () => {
        const payload: SetCategoryBudget = {
          category: "eating out",
          weeklyBudget: 120,
        }

        const newState = reducer(
          initialState,
          actions.setCategoryBudget(payload)
        )

        expect(initialState.categories["eating out"].weeklyBudget).toBe(100)
        expect(newState.categories["eating out"].weeklyBudget).toBe(120)
      }
    )
  })

  describe("addCategory", () => {
    it(
      generateGivenShouldTestDescription({
        given: "a new category and a new budget",
        should: "add a new category accordingly",
      }),
      () => {
        const payload: AddCategory = {
          category: "new category",
          weeklyBudget: 120,
        }

        const newState = reducer(initialState, actions.addCategory(payload))

        expect(newState.categories).toHaveProperty("new category")
        expect(newState.categories["new category"].weeklyBudget).toBe(120)
        expect(
          newState.categories["new category"].spendingHistory
        ).toBeInstanceOf(Array)
        expect(newState.categories["new category"].spendingHistory.length).toBe(
          0
        )
      }
    )
  })

  describe("deleteCategory", () => {
    it(
      generateGivenShouldTestDescription({
        given: "an existing category name",
        should: "delete that category",
      }),
      () => {
        const payload: DeleteCategory = {
          category: "groceries",
        }

        const newState = reducer(initialState, actions.deleteCategory(payload))

        const existingCategories = selectAllSpendingCategoryNames({
          spending: newState,
        })

        expect(existingCategories.includes("groceries")).toBe(false)
        expect(newState.categories.groceries).toBe(undefined)
      }
    )
  })

  describe("updateCategory", () => {
    it(
      generateGivenShouldTestDescription({
        given: "the same category name and a new budget",
        should: "only update the budget",
      }),
      () => {
        const payload: UpdateCategory = {
          currentCategory: "groceries",
          updatedCategory: "groceries",
          updatedBudget: 150,
        }

        const newState = reducer(initialState, actions.updateCategory(payload))

        const existingCategories = selectAllSpendingCategoryNames({
          spending: newState,
        })

        expect(existingCategories.includes("groceries")).toBe(true)
        expect(newState.categories.groceries.spendingHistory).toStrictEqual(
          initialState.categories.groceries.spendingHistory
        )
        expect(newState.categories.groceries.weeklyBudget).toBe(150)
      }
    )

    it(
      generateGivenShouldTestDescription({
        given: "only a new name",
        should: "create a new category with the same history and budget",
      }),
      () => {
        const payload: UpdateCategory = {
          currentCategory: "groceries",
          updatedCategory: "food",
        }

        const newState = reducer(initialState, actions.updateCategory(payload))

        const existingCategories = selectAllSpendingCategoryNames({
          spending: newState,
        })

        expect(existingCategories.includes("groceries")).toBe(false)
        expect(existingCategories.includes("food")).toBe(true)
        expect(newState.categories.food).toStrictEqual(
          initialState.categories.groceries
        )
      }
    )

    it(
      generateGivenShouldTestDescription({
        given: "a new name and new budget",
        should: "create a new category with the same history but a new budget",
      }),
      () => {
        const payload: UpdateCategory = {
          currentCategory: "groceries",
          updatedCategory: "food",
          updatedBudget: 150,
        }

        const newState = reducer(initialState, actions.updateCategory(payload))

        const existingCategories = selectAllSpendingCategoryNames({
          spending: newState,
        })

        expect(existingCategories.includes("groceries")).toBe(false)
        expect(existingCategories.includes("food")).toBe(true)
        expect(newState.categories.food.spendingHistory).toStrictEqual(
          initialState.categories.groceries.spendingHistory
        )
        expect(newState.categories.food.weeklyBudget).toBe(
          payload.updatedBudget
        )
      }
    )
  })
})
