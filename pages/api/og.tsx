import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getNumberArchived, getLastUpdated, getStorageUsed } from "../../lib/kv";
export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    let [numberArchived, lastUpdated, storageUsedString] = await Promise.all([
      getNumberArchived(),
      getLastUpdated(),
      getStorageUsed(),
    ]);

    const date = new Date(lastUpdated);

    lastUpdated = date.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const numArchivedString = numberArchived.toLocaleString("en-US");

    return new ImageResponse(
      (
        <div tw="bg-[#F6F6F6F0] text-black h-full w-full flex items-center justify-center">
          <div tw="flex flex-col justify-center items-center w-full h-full">
            <img
              src="https://files.pinapelz.com/android-chrome-512x512.png"
              tw="h-64 w-64 rounded-full"
            />
            <h1 tw="text-4xl font-bold mb-1">Patchwork Archive</h1>
            <h2 tw="mt-0 text-xl">Preserving rhythm, one video at a time</h2>
            <p tw="text-3xl mt-0">We have {numArchivedString} videos archived taking up {storageUsedString} GB</p>
            <p tw="text-lg -mt-2 text-[#828282]">As of {lastUpdated} (PST)</p>
          </div>
        </div>
      ),
      {
        width: 900,
        height: 530,
        headers: {
          "Cache-Control": "no-cache, no-store",
        },
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
