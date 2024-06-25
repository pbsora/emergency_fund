export type User = {
  userId: string;
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
