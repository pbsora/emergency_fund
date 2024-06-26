"use client";

import { imageChangeAction } from "@/actions/configActions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const ImageForm = () => {
  const [result, action] = useFormState(
    imageChangeAction,
    null
  );

  return (
    <form
      action={action}
      className="flex flex-col justify-center w-full gap-2"
    >
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG or JPEG (MAX: 5MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="image"
            className="hidden"
          />
        </label>
      </div>
      {result && result.success ? (
        <p className=" text-sm text-center">
          {result.success}
        </p>
      ) : (
        <p className="text-red-500 text-sm text-center">
          {result?.message}
        </p>
      )}
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending ? "Uploading" : "Upload"}
    </Button>
  );
};

export default ImageForm;
