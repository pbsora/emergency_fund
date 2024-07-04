"use server";

import {
  Pagination,
  Transaction,
} from "@/lib/Types & Interfaces";
import {
  AggregateErrorHelper,
  ResponseMessageHelper,
} from "@/lib/helpers";
import API from "@/utils/api";
import { revalidatePath } from "next/cache";
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

export const deleteTransactionAction = async (
  id: string
) => {
  try {
    const res = await API.delete(`transactions/${id}`);

    if (!res.ok) {
      return await ResponseMessageHelper(res);
    }

    revalidatePath("/transactions");
    revalidatePath("/dashboard");
  } catch (error) {
    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }
  }
};

export const fetchTransactions = async (
  page = 1,
  filter: string
) => {
  const res = await API.get(
    `/transactions?page=${page}&criteria=${filter}`
  );

  const pagination: Pagination = JSON.parse(
    res.headers.get("X-Pagination") as string
  );

  const transactions: Transaction[] = await res.json();

  return {
    pagination,
    transactions,
  };
};
