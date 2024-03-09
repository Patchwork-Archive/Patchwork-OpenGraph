import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getNumberArchived, getLastUpdated } from '../../lib/upstash';
export const config = {
	runtime: 'edge',
};

export default async function handler(req: NextRequest) {
	try {
		let [numberArchived, lastUpdated] = await Promise.all([getNumberArchived(), getLastUpdated()]);

		const date = new Date(lastUpdated);

		lastUpdated = date.toLocaleString('en-US', {
			timeZone: 'America/Los_Angeles',
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		});

		return new ImageResponse(
			(
				<div tw='bg-[#F6F6F0] text-black h-full w-full flex items-center justify-center'>
					<div tw='flex justify-center items-center w-1/2 h-full'>
						<div tw='flex flex-col px-6'>
                            <p tw='text-2xl font-bold'>Number of Songs Archived</p>
                            <p tw='text-4xl font-bold'>{numberArchived}</p>
						</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				headers: {
					'Cache-Control': 'no-cache, no-store',
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