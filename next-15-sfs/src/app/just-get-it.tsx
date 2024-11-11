"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function JustGetIt({
  getCount,
}: {
  getCount: () => Promise<number>;
}) {
  const [count, setCount] = useState(0);

  return (
    <Button onClick={() => getCount().then(setCount)}>
      Get Count - {count}
    </Button>
  );
}
