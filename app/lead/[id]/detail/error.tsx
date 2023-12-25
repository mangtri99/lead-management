"use client";

import { Card } from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <Card className="text-center p-4">
        <h1 className="text-2xl mb-6">Lead not found</h1>
        <p className="mb-6">
          The lead you are looking for does not exist or has been deleted.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            reset();
          }}
        >
          Try again
        </button>
      </Card>
    </div>
  );
}
