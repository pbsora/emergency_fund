import { CustomAggregateError } from "./Types & Interfaces";

export const AggregateErrorHelper = (
  error: AggregateError
) => {
  const errorMessage = Object.values(
    error
  )[0] as CustomAggregateError;

  if (errorMessage.errors[0].code == "ECONNREFUSED") {
    return {
      message: "Server is down. Please try again later!",
    };
  } else {
    return { message: "Something went wrong!" };
  }
};

export const ResponseMessageHelper = async (
  res: Response
): Promise<{ message: string }> => {
  const contentType = res.headers.get("Content-Type");
  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    const message = await res.json();
    return (
      { message: message.message } ||
      "Failed to upload image"
    );
  } else {
    const message = await res.text();
    return { message } || "Failed to upload image";
  }
};

export const Capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const Parse = async (res: Response) => {
  const contentType = res.headers.get("Content-Type");
  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    return await res.json();
  } else {
    return await res.text();
  }
};
