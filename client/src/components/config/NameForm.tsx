"use client";

import { updateNameAction } from "@/actions/configActions";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { Capitalize } from "@/lib/helpers";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NameForm = () => {
  const [error, action] = useFormState(
    updateNameAction,
    null
  );

  const { name } = useAppSelector(
    (state) => state.user.value
  );

  return (
    <div className="flex flex-col gap-2 h-[100vh] md:h-auto w-full sm:w-3/4 m-auto md:m-0 lg:w-2/4 xl:w-[35%]">
      <h2 className="font-semibold text-lg">Name change</h2>
      <form action={action} className="flex flex-col gap-4">
        <Input
          name="name"
          type="text"
          className="border border-black"
          placeholder="Name"
          defaultValue={Capitalize(name)}
        />
        {error && error.success ? (
          <p className=" text-sm text-center">
            {error.success}
          </p>
        ) : (
          <p className="text-red-500 text-sm text-center">
            {error?.message}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending}>
      {pending ? "Please wait" : "Change name"}
    </Button>
  );
};

export default NameForm;
