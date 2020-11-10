type SpendingItem = {
  amount: number;
  note: string;
  date: Date;
  id?: string;
};

type Category =
  | "groceries"
  | "eating out"
  | "entertainment"
  | "bills"
  | "others";

type CategoryState = { spendingHistory: SpendingItem[]; budget: number };

type SpendingState = {
  [T in Category]: CategoryState;
};

type getBudget = (state: CategoryState, category: Category) => number;
type getSpentBudget = (
  spendingHistory: SpendingItem[],
  category: Category
) => number;

//Reducer
