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
  initialState,
  selectAllSpendingCategoryNames,
} from "./spendingSlice"
import { generateGivenShouldTestDescription } from "../../utils/generateGivenShouldTestDescription"
const { actions, reducer } = spendingSlice

//reference: https://github.com/reduxjs/redux-toolkit/blob/master/src/createSlice.test.ts

const initialSpendingState: SpendingState = {
  groceries: {
    spendingHistory: [
      {
        amount: 20,
        date: new Date("2020-01-02"),
        note: "Testing",
        id: `groceries-${new Date("2020-01-02").getTime()}`,
      },
    ],
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
    it(
      generateGivenShouldTestDescription({
        given: "an object matching the SpendingState Type",
        should: "set the state as said object",
      }),
      () => {
        const newState = reducer(
          initialState,
          actions.setSpendingState(initialSpendingState)
        )
        expect(newState).toEqual(initialSpendingState)
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

        const newState = reducer(
          initialSpendingState,
          actions.addSpendingItem(payload)
        )

        expect(newState.groceries.spendingHistory).toContainEqual(expected)
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
          initialSpendingState,
          actions.deleteSpendingItem(payload)
        )

        expect(initialSpendingState.entertainment.spendingHistory.length).toBe(
          1
        )
        expect(newState.entertainment.spendingHistory.length).toBe(0)
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
          initialSpendingState,
          actions.updateSpendingItem(payload)
        )

        expect(newState["eating out"].spendingHistory).toContainEqual(
          payload.updatedSpendingItem
        )
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
          budget: 120,
        }

        const newState = reducer(
          initialSpendingState,
          actions.setCategoryBudget(payload)
        )

        expect(initialSpendingState["eating out"].budget).toBe(100)
        expect(newState["eating out"].budget).toBe(120)
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
          budget: 120,
        }

        const newState = reducer(
          initialSpendingState,
          actions.addCategory(payload)
        )

        expect(newState).toHaveProperty("new category")
        expect(newState["new category"].budget).toBe(120)
        expect(newState["new category"].spendingHistory).toBeInstanceOf(Array)
        expect(newState["new category"].spendingHistory.length).toBe(0)
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

        const newState = reducer(
          initialSpendingState,
          actions.deleteCategory(payload)
        )

        const newCategories = selectAllSpendingCategoryNames({
          spending: newState,
        })

        expect(newCategories.includes("groceries")).toBe(false)
        expect(newState.groceries).toBe(undefined)
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
          previousCategory: "groceries",
          updatedCategory: "groceries",
          updatedBudget: 150,
        }

        const newState = reducer(
          initialSpendingState,
          actions.updateCategory(payload)
        )

        const newCategories = selectAllSpendingCategoryNames({
          spending: newState,
        })

        expect(newCategories.includes("groceries")).toBe(true)
        expect(newState.groceries.spendingHistory).toStrictEqual(
          initialSpendingState.groceries.spendingHistory
        )
        expect(newState.groceries.budget).toBe(150)
      }
    )

    it(
      generateGivenShouldTestDescription({
        given: "only a new name",
        should: "create a new category with the same history and budget",
      }),
      () => {
        const payload: UpdateCategory = {
          previousCategory: "groceries",
          updatedCategory: "food",
        }

        const newState = reducer(
          initialSpendingState,
          actions.updateCategory(payload)
        )

        const allCategories = selectAllSpendingCategoryNames({
          spending: newState,
        })

        expect(allCategories.includes("groceries")).toBe(false)
        expect(allCategories.includes("food")).toBe(true)
        expect(newState.food).toStrictEqual(initialSpendingState.groceries)
      }
    )

    it(
      generateGivenShouldTestDescription({
        given: "a new name and new budget",
        should: "create a new category with the same history but a new budget",
      }),
      () => {
        const payload: UpdateCategory = {
          previousCategory: "groceries",
          updatedCategory: "food",
          updatedBudget: 150,
        }

        const newState = reducer(
          initialSpendingState,
          actions.updateCategory(payload)
        )

        const allCategories = selectAllSpendingCategoryNames({
          spending: newState,
        })

        expect(allCategories.includes("groceries")).toBe(false)
        expect(allCategories.includes("food")).toBe(true)
        expect(newState.food.spendingHistory).toStrictEqual(
          initialSpendingState.groceries.spendingHistory
        )
        expect(newState.food.budget).toBe(payload.updatedBudget)
      }
    )
  })
})
