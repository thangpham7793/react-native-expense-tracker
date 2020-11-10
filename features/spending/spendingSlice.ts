import { AppState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SpendingState = {
  groceries: { spendingHistory: [], budget: 0 },
  entertainment: { spendingHistory: [], budget: 0 },
  "eating out": { spendingHistory: [], budget: 0 },
  others: { spendingHistory: [], budget: 0 },
  bills: { spendingHistory: [], budget: 0 },
};

function getItemIndex(
  spendingHistory: SpendingItem[],
  targetItem: SpendingItem
) {
  return spendingHistory.findIndex((item) => (item.id = targetItem.id));
}

function updateItemInfo(
  spendingHistory: SpendingItem[],
  targetItem: SpendingItem
) {
  const targetItemIndex = getItemIndex(spendingHistory, targetItem);
  spendingHistory[targetItemIndex] = targetItem;
}

type SetBudgetActionPayload = {
  category: Category;
  budget: number;
};

type CRUDSpendingItemPayload = {
  category: Category;
  spendingItem: SpendingItem;
};

type EditSpendingItemPayload = {
  category: Category;
  updatedSpendingItem: SpendingItem;
};

export const spendingSlice = createSlice({
  name: "spending",
  initialState,
  reducers: {
    setBudget: (
      state,
      action: { type: string; payload: SetBudgetActionPayload }
    ) => {
      const { category, budget } = action.payload;
      state[category].budget = budget;
    },

    addSpendingItem: {
      reducer(
        state,
        action: {
          type: string;
          payload: { category: Category; spendingItem: SpendingItem };
        }
      ) {
        const { category, spendingItem } = action.payload;
        state[category].spendingHistory.push(spendingItem);
      },

      prepare(newItem: { category: Category; spendingItem: SpendingItem }) {
        newItem.spendingItem.id = `${newItem.category}-${newItem.spendingItem.date}`;
        return {
          payload: {
            ...newItem,
          },
        };
      },
    },

    removeSpendingItem: (
      state,
      action: { type: string; payload: CRUDSpendingItemPayload }
    ) => {
      const { category, spendingItem } = action.payload;
    },

    editSpendingItem: (
      state,
      action: { type: string; payload: EditSpendingItemPayload }
    ) => {
      const { category, updatedSpendingItem } = action.payload;
      updateItemInfo(state[category].spendingHistory, updatedSpendingItem);
    },
  },
});

export const selectCategory = (state: AppState, category: Category) =>
  state.spending[category];

export const selectCategoryHistory = (state: AppState, category: Category) =>
  state.spending[category].spendingHistory;

function calculateTotalSpentBudget(spendingHistory: SpendingItem[]) {
  return spendingHistory.reduce(
    (total: number, { amount }: SpendingItem) => total + amount,
    0
  );
}

export const selectSpentBudget = (state: AppState, category: Category) => {
  const { spendingHistory } = selectCategory(state, category);
  calculateTotalSpentBudget(spendingHistory);
};

export default spendingSlice.reducer;
