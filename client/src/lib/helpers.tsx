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
) => {
  const contentType = res.headers.get("Content-Type");
  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    const message = await res.json();
    return { message } || "Failed to upload image";
  } else {
    const message = await res.text();
    return { message } || "Failed to upload image";
  }
};
