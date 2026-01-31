import { useEffect } from "react";

type ErrorMessageProps = {
  message: string;
  setShowErrorMessage: (errorMessage: boolean) => void;
  errorMessage: boolean;
  hasSucceeded: boolean;
};

export default function ErrorMessage({
  message,
  setShowErrorMessage,
  errorMessage,
  hasSucceeded,
}: ErrorMessageProps) {
  if (!message) return null;
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setShowErrorMessage(!errorMessage);
    }, 5000); // 5 secondes

    return () => clearTimeout(timer);
  }, [message]);

  if (!errorMessage) return null;
  return (
    <div
      className={
        hasSucceeded
          ? "fixed top-[100px] left-0 right-0 flex justify-center gap-3 rounded-md border border-green-300  bg-green-50 px-4 py-3 text-sm text-green-700"
          : "fixed top-[100px] left-0 right-0 flex justify-centers gap-3 rounded-md border border-red-300  bg-red-50 px-4 py-3 text-sm text-red-700"
      }
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
}
