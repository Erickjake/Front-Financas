export type Goal = {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
};

export type CreateGoalPayload = {
  title: string;
  targetAmount: number;
  currentAmount?: number;
  dueDate: string;
};

export type UpdateGoalPayload = Partial<CreateGoalPayload>;

export type BudgetStatus = {
  id: string;
  title: string;
  targetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  month: number;
  year: number;
};
