export type User = {
  userId: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
};

export interface UserState {
  value: User;
}

export interface CustomError {
  code: string;
  message: string;
  [key: string]: any;
}
export interface CustomAggregateError
  extends AggregateError {
  errors: CustomError[];
}

export type Transaction = {
  transactionId: string;
  amount: number;
  date: Date;
  description?: string;
  userId?: string;
};

export type Status = {
  total: number;
  count: number;
  last: Transaction;
  months: number;
  monthlyExpenses: number;
};

export type UserConfig = {
  monthlyExpenses: number;
  months: number;
};
