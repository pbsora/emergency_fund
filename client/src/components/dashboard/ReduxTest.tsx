"use client";
import { login } from "@/config/store/store";
import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/ReduxHooks";
import { useEffect, useState } from "react";

type Props = {
  user: {
    userId: string;
    username: string;
    email: string;
  };
};

const ReduxTest = ({ user }: Props) => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const { userId, username, email } = useAppSelector(
    (state) => state.user.value
  );

  useEffect(() => {
    dispatch(login(user));
  }, [dispatch, user]);

  console.log(username);
  return (
    <div className="text-white">
      <h1 className="">{userId}</h1>
      <h1 className="">{username}</h1>
      <h1 className="">{email}</h1>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="bg-zinc-800"
      />
      <button
        onClick={() =>
          dispatch(login({ userId, username: name, email }))
        }
        className="text-white"
      >
        Submit
      </button>
    </div>
  );
};
export default ReduxTest;
