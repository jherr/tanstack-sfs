"use client";
import { useState, useEffect } from "react";

export default function DateDisplay({
  getDate,
}: {
  getDate: () => Promise<JSX.Element>;
}) {
  const [date, setDate] = useState<JSX.Element | null>(null);

  useEffect(() => {
    getDate().then(setDate);
  }, [getDate]);

  return <div>{date}</div>;
}
