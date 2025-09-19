import { useSession } from "next-auth/react";

// Current user for client side/components
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
