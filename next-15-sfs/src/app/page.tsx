import fs from "fs";

import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

import CounterClient from "./counter-client";
import JustGetIt from "./just-get-it";
import DateDisplay from "./date-display";

const filePath = "count.txt";

async function readCount() {
  "use cache";
  cacheTag("count");

  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0")
  );
}

const getCount = async () => {
  "use server";
  return readCount();
};

const updateCount = async (addBy: number) => {
  "use server";
  const count = await readCount();
  await fs.promises.writeFile(filePath, `${count + addBy}`);
  revalidateTag("count");
};

export default async function Page() {
  const count = await getCount();

  async function getDate() {
    "use server";

    return (
      <div className="text-red-500 text-3xl">
        {new Date().toLocaleTimeString()}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <CounterClient updateCount={updateCount} count={count} />
      <JustGetIt getCount={getCount} />
      <DateDisplay getDate={getDate} />
    </div>
  );
}
