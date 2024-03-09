import { TopStory } from "./types";
import { kv } from "@vercel/kv";

export const getLastUpdated = async (): Promise<string> => {
    return kv.get('last-updated') as Promise<string>;
};


export const setNumberArchived = async (number: number) => {
	await kv.set('number-archived', number);
	await kv.set('last-updated', new Date().toISOString());
}

export const getNumberArchived = async (): Promise<number> => {
	return (await kv.get('number-archived')) as number;
}