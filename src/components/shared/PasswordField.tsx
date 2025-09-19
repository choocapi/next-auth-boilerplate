import { Box } from "@/components/shared/Box";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { createElement, JSX, useState } from "react";
import { useFormContext } from "react-hook-form";

type PasswordFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string | JSX.Element;
  isPending?: boolean;
  autoComplete?: "current-password" | "off" | "on";
};

export function PasswordField({
  name,
  label,
  placeholder = "********",
  description,
  isPending,
  autoComplete = "on",
}: PasswordFieldProps) {
  const { control } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Box className="relative">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="pr-12"
                aria-invalid={!!fieldState.error}
                disabled={isPending}
              />
              <Box
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground select-none"
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordVisibility(!passwordVisibility);
                }}
              >
                {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                  className: "h-6 w-6 pointer-events-none",
                })}
              </Box>
            </Box>
          </FormControl>
          <FormMessage />
          {description && (
            <FormDescription className="flex flex-row-reverse">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
