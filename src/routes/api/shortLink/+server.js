import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { url } = await request.json();

	if (!isValidURL(url)) {
		throw error(400, 'URL parameter is missing or invalid.');
	}

	return json(String(url));
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
