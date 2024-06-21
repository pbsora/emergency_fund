export type User = {
  userId: string;
  username: string;
  email: string;
};

export interface UserState {
  value: User;
}
