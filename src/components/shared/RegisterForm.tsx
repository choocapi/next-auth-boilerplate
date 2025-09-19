"use client";

import { register } from "@/actions/register";
import CardWrapper from "@/components/shared/CardWrapper";
import FormError from "@/components/shared/FormError";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import FormSuccess from "@/components/shared/FormSuccess";
import { PasswordField } from "@/components/shared/PasswordField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Register"
      subHeaderLabel="Create your account. It's free and only takes a minute."
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      // showOAuth
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="given-name"
                      disabled={isPending}
                      placeholder="Nguyen Van A"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              autoComplete="off"
              isPending={isPending}
            />

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="off"
              isPending={isPending}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <FormSubmitButton isPending={isPending}>
            {isPending ? "Signing up..." : "Sign Up"}
          </FormSubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
