import { getPasswordResetTokenByEmail } from "@/data/passwordResetToken";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import crypt from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

const TEN_MINUTES = 10 * 60 * 1000;

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + TEN_MINUTES);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + TEN_MINUTES);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypt.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(Date.now() + TEN_MINUTES);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
