"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || undefined;
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        className="flex-1"
        size="lg"
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle className="w-5 h-5" />
        Google
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        size="lg"
        onClick={() => {
          onClick("facebook");
        }}
      >
        <FaFacebook className="w-5 h-5 text-blue-600" />
        Facebook
      </Button>
    </div>
  );
};

export default OAuth;
