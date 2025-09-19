import UserInfo from "@/components/shared/UserInfo";
import { currentUser } from "@/lib/auth";

export default async function ServerPage() {
  const user = await currentUser();
  return (
    <section>
      <UserInfo user={user} label="Server Component" />
    </section>
  );
}
