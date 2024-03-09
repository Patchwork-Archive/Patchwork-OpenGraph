import { NextResponse } from 'next/server';
import { setPatchworkData } from '../../lib/kv';

export const config = {
	runtime: 'edge',
};


const getArchiveData = async () => {
    const res = await fetch('https://patchwork-backend.vercel.app/api/storage/status');
    const data = await res.json();
    return data;
}
    

export default async function handler() {
	try {
		const archiveData = await getArchiveData();
        await setPatchworkData(archiveData);
        return NextResponse.json({
            data: `Updated top stories at ${new Date().toISOString()}. Number of songs archived: ${archiveData.number_of_files}, storage used: ${archiveData.storage_size} gigabytes`
        });
	} catch (error: any) {
		console.log({ error });
		return NextResponse.json({
			error: error.message,
		});
	}
}