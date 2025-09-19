"use client";

import BackButton from "@/components/shared/BackButton";
import Header from "@/components/shared/Header";
import OAuth from "@/components/shared/OAuth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  subHeaderLabel?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showOAuth?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  subHeaderLabel,
  backButtonLabel,
  backButtonHref,
  showOAuth,
}: CardWrapperProps) => {
  return (
    <Card className="w-md">
      <CardHeader>
        <Header label={headerLabel} subLabel={subHeaderLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showOAuth && (
        <CardFooter>
          <OAuth />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
