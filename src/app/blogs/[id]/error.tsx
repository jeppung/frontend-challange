"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "../../../components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container text-center py-10">
      <h2 className="text-xl">Something went wrong!</h2>
      <div className="mt-5">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
