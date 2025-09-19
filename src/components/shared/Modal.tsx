"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { JSX } from "react";

interface ModalProps {
  trigger: string | JSX.Element;
  content: string | JSX.Element;
  asChild?: boolean;
}

const Modal = ({ trigger, content, asChild }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{trigger}</DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Modal</DialogTitle>
            <DialogDescription>Modal description</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
