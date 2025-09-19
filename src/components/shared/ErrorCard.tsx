import CardWrapper from "@/components/shared/CardWrapper";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorCard = () => {
  const message = "An unexpected error occurred. Please try again.";
  return (
    <CardWrapper
      headerLabel="Oops!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <FaExclamationTriangle className="h-4 w-4 shrink-0" />
        <span>{message}</span>
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
