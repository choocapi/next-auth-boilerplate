"use client";

import LoginForm from "@/components/shared/LoginForm";
import LogoutButton from "@/components/shared/LogoutButton";
import Modal from "@/components/shared/Modal";
import RegisterForm from "@/components/shared/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogOut, Search, Settings, User, UserCircle } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const user = useCurrentUser();
  const isAuthenticated = !!user?.id;

  return (
    <header className="border-b shadow-sm rounded-md bg-amber-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          >
            NextAuth Boilerplate
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
            <Input type="search" placeholder="Search..." className="pr-10" />
            <Search className="h-4 w-4 absolute right-3 text-gray-500" />
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <LogoutButton>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </LogoutButton>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Modal
                  trigger={<Button variant="ghost">Log in</Button>}
                  content={<LoginForm />}
                  asChild
                />
                <Modal
                  trigger={<Button>Sign up</Button>}
                  content={<RegisterForm />}
                  asChild
                />
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
