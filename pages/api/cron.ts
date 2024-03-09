import { NextResponse } from 'next/server';

export const config = {
	runtime: 'edge',
};


const getNumSongsArchived = async () => {
    const res = await fetch('https://patchwork-backend.vercel.app/api/storage/status');
    const data = await res.json();
    return data.number_of_files;
}
    

export default async function handler() {
	try {
		const archiveData = await getNumSongsArchived();

        return NextResponse.json({
            data: `Updated top stories at ${new Date().toISOString()}. Number of songs archived: ${archiveData}`
        });
	} catch (error: any) {
		console.log({ error });
		return NextResponse.json({
			error: error.message,
		});
	}
}