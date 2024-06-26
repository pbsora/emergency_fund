import { User, UserState } from "@/lib/Types & Interfaces";
import {
  PayloadAction,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";

const initialState: UserState = {
  value: {
    userId: "",
    name: "",
    username: "",
    email: "",
    profilePicture: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state: UserState,
      action: PayloadAction<User>
    ) => {
      state.value = action.payload;
    },
  },
});
export const { login } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
