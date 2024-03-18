import { client } from '$lib/db/dbClient';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const link = await client.batch([
		{
			sql: 'select (url) from links where shortpath = :shortpath limit 1',
			args: { shortpath: params.shortpath }
		},
		{
			sql: `\
update links
set usage = usage + 1
where shortpath = :shortpath;`,
			args: { shortpath: params.shortpath }
		}
	]);

	const url = link[0].rows[0]?.url;
	if (typeof url === 'string') {
		throw redirect(307, url);
	}

	throw redirect(307, '/');
}
