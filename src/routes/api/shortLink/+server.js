import { client } from '$lib/db/dbClient';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { url } = await request.json();

	if (!isValidURL(url)) {
		throw error(400, 'URL parameter is missing or invalid.');
	}

	try {
		const result = await client.execute({
			sql: 'insert into links (url, shortpath) values (:url, :shortpath) returning shortpath',
			args: { url, shortpath: Math.random().toString() }
		});

		return json({ shortpath: result.rows[0].shortpath });
	} catch (/** @type{any} */ e) {
		/** @type{string} */
		const errorMessage = e.cause.proto.message;

		console.log(errorMessage);
		throw error(409, errorMessage);
	}
}

/**
 * @param {string} url
 * @return {boolean}
 * */
function isValidURL(url) {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
}
