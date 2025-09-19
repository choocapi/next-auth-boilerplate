"use client";

import UserButton from "@/components/shared/UserButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-md shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/dashboard/server" ? "default" : "outline"}
        >
          <Link href={"/dashboard/server"}>Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard/client" ? "default" : "outline"}
        >
          <Link href={"/dashboard/client"}>Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard/admin" ? "default" : "outline"}
        >
          <Link href={"/dashboard/admin"}>Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard/settings" ? "default" : "outline"}
        >
          <Link href={"/dashboard/settings"}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default NavBar;
