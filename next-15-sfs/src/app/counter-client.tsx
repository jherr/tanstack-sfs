"use client";

import { Button } from "@/components/ui/button";

export default function CounterClient({
  updateCount,
  count,
}: {
  updateCount: (addBy: number) => Promise<void>;
  count: number;
}) {
  return (
    <Button
      onClick={async () => {
        await updateCount(1);
      }}
    >
      Add 1 to {count}?
    </Button>
  );
}
