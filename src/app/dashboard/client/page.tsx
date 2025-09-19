"use client";

import UserInfo from "@/components/shared/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function ServerPage() {
  const user = useCurrentUser();
  return (
    <section>
      <UserInfo user={user} label="Client Component" />
    </section>
  );
}
