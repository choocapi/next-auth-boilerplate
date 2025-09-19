"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { resetPasswordSchema } from "@/schemas";
import z from "zod";

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
) => {
  const validatedFields = resetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(
    existingUser.email
  );
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent" };
};
