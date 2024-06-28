"use server";

import {
  AggregateErrorHelper,
  ResponseMessageHelper,
} from "@/lib/helpers";
import API from "@/utils/api";
import { revalidatePath } from "next/cache";
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
    revalidatePath("/dashboard/config");
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
