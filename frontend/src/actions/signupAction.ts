"use server";

import { signupSchema } from "@/schema/signupSchema";
import { redirect } from "next/navigation";

const signupAction = async (prevState: FormState, formData: FormData) => {
  const rowData = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  };

  const photoEntry = formData.get("photo"); // string | File | null
  const photo = photoEntry instanceof File ? photoEntry : undefined;

  const values = {
    name: rowData.name,
    email: rowData.email,
    password: rowData.password,
    photo,
  };

  // Zod validation
  const parsed = signupSchema.safeParse(rowData);

  if (!parsed.success) {
    const errors: NonNullable<FormState["errors"]> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof NonNullable<FormState["errors"]>;
      errors[field] = issue.message;
    });

    return { values, errors };
  }

  console.log("serveraction photo: ", photo);
  //  File validation
  if (photo) {
    if (!photo.type.startsWith("image/")) {
      return {
        values,
        errors: { photo: "Only image files allowed" },
      };
    }

    if (photo.size > 0.1 * 1024 * 1024) {
      return {
        values,
        errors: { photo: "Image must be under 100kb" },
      };
    }
  }

  //   Send to backend
  const backendForm = new FormData();
  backendForm.append("name", parsed.data.name);
  backendForm.append("email", parsed.data.email);
  backendForm.append("password", parsed.data.password);

  if (photo) backendForm.append("photo", photo);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/v1/user/register`,
      {
        method: "POST",
        body: backendForm,
      },
    );
    const result = await response.json();
    if (!result.success) {
      const errors: FormState["errors"] = {};
      result.errors?.forEach((error: { path: string; message: string }) => {
        const field = error.path as keyof FormState["errors"];
        errors[field] = error.message;
      });

      return { values, errors };
    }
  } catch (error) {
    const errors: FormState["errors"] = {
      general: error instanceof Error ? error.message : "Something went wrong",
    };
    console.log(error);
    return { values, errors };
  }

  redirect("/");
};

export default signupAction;

export type FormState = {
  values: {
    name: string;
    email: string;
    password: string;
    photo: File | undefined;
  };
  errors: Partial<
    Record<"name" | "email" | "password" | "photo" | "general", string>
  >;
};
