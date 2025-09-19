import { UserRole } from "@prisma/client";
import z from "zod";

export const passwordSchema = z
  .string()
  .min(1, {
    error: "Password can not be empty.",
  })
  .regex(/^.{8,20}$/, {
    message: "Minimum 8 and maximum 20 characters.",
  })
  .regex(/(?=.*[A-Z])/, {
    message: "At least one uppercase character.",
  })
  .regex(/(?=.*[a-z])/, {
    message: "At least one lowercase character.",
  })
  .regex(/(?=.*\d)/, {
    message: "At least one digit.",
  })
  .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
    message: "At least one special character.",
  });

export const emailSchema = z
  .string()
  .min(1, { error: "Email is required." })
  .email({ error: "Invalid email address." })
  .transform((value) => value.toLowerCase());

export const codeSchema = z
  .string()
  .length(6, {
    error: "Code must be 6 characters.",
  })
  .regex(/^\d+$/, {
    message: "Code must contain only digits.",
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  code: z.optional(codeSchema),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(1, {
      error: "Full name is required.",
    }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const resetPasswordSchema = z.object({
  email: emailSchema,
});

export const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(emailSchema),
    password: z.optional(passwordSchema),
    newPassword: z.optional(passwordSchema),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    {
      path: ["newPassword"],
      error: "New password is required.",
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;
      return true;
    },
    {
      path: ["password"],
      error: "Current password is required.",
    }
  );
