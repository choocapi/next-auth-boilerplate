"use client";

import { newPassword } from "@/actions/newPassword";
import CardWrapper from "@/components/shared/CardWrapper";
import FormError from "@/components/shared/FormError";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import FormSuccess from "@/components/shared/FormSuccess";
import { Form } from "@/components/ui/form";
import { newPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { PasswordField } from "./PasswordField";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Set a new password"
      subHeaderLabel="Please enter your new password."
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <PasswordField
              name="password"
              label="New Password"
              isPending={isPending}
              autoComplete="off"
            />
            <PasswordField
              label="Confirm New Password"
              isPending={isPending}
              name="confirmPassword"
              autoComplete="off"
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <FormSubmitButton isPending={isPending}>
            {isPending ? "Changing..." : "Change Password"}
          </FormSubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
