"use client";

import { loginWithCredentials } from "@/actions/login";
import CardWrapper from "@/components/shared/CardWrapper";
import FormError from "@/components/shared/FormError";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import FormSuccess from "@/components/shared/FormSuccess";
import { PasswordField } from "@/components/shared/PasswordField";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || undefined;
  const urlError = searchParams.get("error")
    ? "Email already in use with different provider."
    : "";

  const { update } = useSession();

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      loginWithCredentials(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset({ password: "" });
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          update();
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Login"
      subHeaderLabel="Welcome back! Please enter your details."
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showOAuth
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl className="w-full">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="email"
                          disabled={isPending}
                          placeholder="nguyenvana@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <PasswordField
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  isPending={isPending}
                  description={
                    <Button
                      className="p-0 m-0"
                      variant="link"
                      size="sm"
                      asChild
                      tabIndex={-1}
                    >
                      <Link href="/auth/reset-password">Forgot password?</Link>
                    </Button>
                  }
                />
              </>
            )}
          </div>
          <FormSuccess message={success} />
          <FormError message={error || urlError} />
          <FormSubmitButton isPending={isPending}>
            {showTwoFactor ? "Confirm" : "Login"}
          </FormSubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
