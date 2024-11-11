import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

import { Input } from "../components/ui/input";

const mergeName = createServerFn(
  "POST",
  ({ first, last }: { first: string; last: string }) => {
    "use server";
    return {
      fullName: `${first} ${last}`,
      sortable: `${last}, ${first}`,
    };
  }
);

export const Route = createFileRoute("/typesafe")({
  component: Home,
});

function Home() {
  const [first, setFirst] = useState("Sarah");
  const [last, setLast] = useState("Connor");
  const [fullName, setFullName] = useState("");
  const [sortable, setSortable] = useState("");

  async function updateFullName() {
    const result = await mergeName({ first, last });
    setFullName(result.fullName);
    setSortable(result.sortable);
  }

  useEffect(() => {
    updateFullName();
  }, [first, last]);

  return (
    <div className="flex flex-col p-10 gap-4">
      <Input
        className="w-full p-2 "
        value={first}
        placeholder="First name"
        onChange={(evt) => setFirst(evt.target.value)}
      />
      <Input
        className="w-full p-2 "
        value={last}
        placeholder="Last name"
        onChange={(evt) => setLast(evt.target.value)}
      />
      <div>Full name: {fullName}</div>
      <div>Sortable: {sortable}</div>
    </div>
  );
}
