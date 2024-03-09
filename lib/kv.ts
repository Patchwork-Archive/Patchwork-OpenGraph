import { PatchworkData } from "./types";
import { kv } from "@vercel/kv";

export const getLastUpdated = async (): Promise<string> => {
    return kv.get('last-updated') as Promise<string>;
};


export const setPatchworkData = async (patchworkData: PatchworkData) => {
	await kv.set('number-archived', patchworkData.number_of_files);
	await kv.set('storage-used', patchworkData.storage_size);
	await kv.set('last-updated', new Date().toISOString());
}

export const getNumberArchived = async (): Promise<number> => {
	return (await kv.get('number-archived')) as number;
}

export const getStorageUsed = async (): Promise<number> => {
	return (await kv.get('storage-used')) as number;
}

