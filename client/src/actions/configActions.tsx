"use server";

import {
  AggregateErrorHelper,
  ResponseMessageHelper,
} from "@/lib/helpers";
import API from "@/utils/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageChangeSchema = z.object({
  image: z
    .any()
    .refine(
      (image) => image?.size <= MAX_FILE_SIZE,
      "Max image size is 5MB"
    )
    .refine(
      (image) => ACCEPTED_IMAGE_TYPES.includes(image?.type),
      "Only .jpeg, .jpg, .png, .webp file formats are accepted"
    ),
});

export const imageChangeAction = async (
  _: unknown,
  formData: FormData
) => {
  try {
    const { error, data } = imageChangeSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (error) {
      return { message: error.errors[0].message };
    }

    const imageData = new FormData();
    imageData.append("image", data.image);

    const res = await API.patch(
      "config/profile-picture",
      formData
    );

    if (!res.ok) {
      return await ResponseMessageHelper(res);
    }
    revalidatePath("/config");
    return {
      success: "Profile picture updated successfully!",
    };
  } catch (error) {
    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }
    return { message: error.message };
  }
};

const nameSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long!")
    .max(30, "Name must be at most 30 characters long!"),
});

export const updateNameAction = async (
  _: unknown,
  formData: FormData
) => {
  try {
    const { error, data } = nameSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (error) {
      return { message: error.errors[0].message };
    }

    const res = await API.patch(`config/name/${data.name}`);

    if (!res.ok) {
      return await ResponseMessageHelper(res);
    }

    revalidatePath("/dashboard/config");
    return { success: "Name updated successfully!" };
  } catch (error) {
    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }
    return { message: error.message };
  }
};

const userConfigSchema = z.object({
  id: z.string(),
  months: z.string({
    required_error: "Number of months is required",
  }),
  monthlyExpenses: z
    .string({
      required_error: "How much are your monthly expenses",
    })
    .transform((val) => val.replace(/[$,]/g, ""))
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Expenses can't be less than zero!",
    })
    .refine((val) => val < 1_000_000, {
      message: "Expenses can't be more than one million!",
    }),
  userId: z.string({
    required_error: "User ID is required",
  }),
});

export const monthsAction = async (
  userId: string,
  id: string,
  months: number,
  _: unknown,
  formData: FormData
) => {
  try {
    formData.append("userId", userId);
    formData.append("id", id);
    formData.append("months", months.toString());

    const { error, data } = userConfigSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (error) {
      return { message: error.errors[0].message };
    }

    if (![3, 6, 12].includes(+data.months)) {
      return { message: "Invalid option" };
    }

    const res = await API.put("config", data);

    if (!res.ok) {
      return await ResponseMessageHelper(res);
    }

    revalidatePath("/config");
    return { success: "Updated successfully" };
  } catch (error) {
    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }
    return { message: error.message };
  }
};

const newConfigSchema = z.object({
  months: z
    .string({
      required_error: "Number of months is required",
    })
    .transform((val) => Number.parseInt(val)),
  monthlyExpenses: z
    .string({
      required_error: "How much are your monthly expenses",
    })
    .transform((val) => val.replace(/[$,]/g, ""))
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Expenses can't be less than zero!",
    })
    .refine((val) => val < 1_000_000, {
      message: "Expenses can't be more than one million!",
    }),
  userId: z.string({
    required_error:
      "Error getting user ID, please reload the page",
  }),
});

export const newConfigAction = async (
  month: string,
  expenses: string,
  userId: string,
  _: unknown
) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("months", month.toString());
    formData.append("monthlyExpenses", expenses);

    const { data, error } =
      await newConfigSchema.safeParseAsync(
        Object.fromEntries(formData.entries())
      );

    if (error) {
      return { message: error.errors[0].message };
    }

    const res = await API.post("config", data);

    if (!res.ok) {
      return await ResponseMessageHelper(res);
    }

    redirect("/dashboard");
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") {
      redirect("/login");
    }

    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }
    return { message: error.message };
  }
};
