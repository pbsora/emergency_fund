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
  date: string | undefined,
  _: unknown,
  formData: FormData
) => {
  try {
    date && formData.append("date", date as string);
    const { error, data } = transactionSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (error) {
      console.log(error);
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
    return { success: "Transaction deleted successfully!" };
  } catch (error) {
    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }
  }
};

export const updateTransactionAction = async (
  userId: string,
  transactionId: string,
  date: string | undefined,
  _: unknown,
  formData: FormData
) => {
  try {
    date && formData.append("date", date as string);
    const { data, error } = transactionSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (error) {
      return { message: error.errors[0].message };
    }

    const res = await API.put("transactions", {
      ...data,
      userId,
      transactionId,
    });

    if (!res.ok) {
      return await ResponseMessageHelper(res);
    }
    revalidatePath("/transactions");
    return { success: "Transaction updated successfully!" };
  } catch (error) {
    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }
    return { message: error.message };
  }
};

export const fetchTransactions = async (
  page = 1,
  filter: string
) => {
  const res = await API.get(
    `/transactions?limit=6&page=${page}&criteria=${filter}`
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
