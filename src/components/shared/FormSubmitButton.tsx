import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface FormSubmitButtonProps extends ButtonProps {
  children: React.ReactNode;
  isPending?: boolean;
}

const FormSubmitButton = ({
  children,
  isPending,
  className,
  ...props
}: FormSubmitButtonProps) => {
  return (
    <Button
      className={cn("w-full", className)}
      type="submit"
      disabled={isPending}
      size="lg"
      {...props}
    >
      {isPending && <Loader2 className="size-6 animate-spin" />}
      {children}
    </Button>
  );
};

export default FormSubmitButton;
