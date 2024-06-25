"use client";

import { imageChangeAction } from "@/actions/configActions";
import { useFormState } from "react-dom";

const ImageForm = () => {
  const [error, action] = useFormState(
    imageChangeAction,
    null
  );

  return (
    <form
      action={action}
      className="flex flex-col justify-center"
    >
      <input type="file" name="image" />
      <button>Submit</button>
      {error && <div>{error.message}</div>}
    </form>
  );
};
export default ImageForm;
