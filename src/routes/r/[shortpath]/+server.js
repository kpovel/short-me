import { client } from '$lib/db/dbClient';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const link = await client.execute({
		sql: 'select (url) from links where shortpath = :shortpath limit 1',
		args: { shortpath: params.shortpath }
	});

	const url = link.rows[0]?.url;
	if (typeof url === 'string') {
		throw redirect(308, url);
	}

	throw redirect(307, '/');
}
