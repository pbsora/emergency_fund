"use server";

import {
  AggregateErrorHelper,
  ResponseMessageHelper,
} from "@/lib/helpers";
import API from "@/utils/api";
import { z } from "zod";

const transactionSchema = z.object({
  amount: z
    .string()
    .max(1000000, "Max amount is $1,000,000"),
  description: z
    .string()
    .min(5, "Description is too short")
    .max(100, "Description is too long"),
  date: z.string(),
});

export const newTransactionAction = async (
  _: unknown,
  formData: FormData
) => {
  try {
    const { error, data } = transactionSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (error) {
      return { message: error.errors[0].message };
    }

    const res = await API.post("/transactions", data);

    if (!res.ok) {
      return await ResponseMessageHelper(res);
    }

    return { success: "Transaction added successfully!" };
  } catch (error) {
    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }
    return { message: error.message };
  }
};
