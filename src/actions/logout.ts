"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // Some server stuff here if needed in the future
  await signOut({
    redirectTo: "/",
  });
};
