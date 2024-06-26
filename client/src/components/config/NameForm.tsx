"use client";

import { updateNameAction } from "@/actions/configActions";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { Capitalize } from "@/lib/helpers";
import { useFormState } from "react-dom";

const NameForm = () => {
  const [error, action] = useFormState(
    updateNameAction,
    null
  );

  const { name } = useAppSelector(
    (state) => state.user.value
  );

  console.log(name);

  return (
    <form action={action}>
      <input
        type="text"
        name="name"
        className="border border-black ml-10"
      />
      <button>Submit</button>
      {name && <p>{Capitalize(name)}</p>}
      {error && <p>{error.message}</p>}
    </form>
  );
};
export default NameForm;
