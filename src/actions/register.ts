"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { registerSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import z from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedData = registerSchema.safeParse(values);
  if (!validatedData.success) {
    return { error: "Invalid input data!" };
  }

  const { fullName, email, password, confirmPassword } = validatedData.data;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User already exists!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
