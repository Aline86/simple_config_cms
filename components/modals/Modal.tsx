import { PageObject } from "@/model/Page";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  title?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Le composant à afficher dans le modal
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const Modal: React.FC<ModalProps> = ({
  title,
  open,
  onOpenChange,
  children,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-90 inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed z-100 top-1/2 left-1/2 w-[100%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg max-h-[90vh]  overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Close className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="mb-6">{children}</div>

          <div className="flex justify-end space-x-2">
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="rounded-md bg-slate-600 px-4 py-2 text-sm text-white hover:bg-slate-700 transition"
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
