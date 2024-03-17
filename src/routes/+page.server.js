import { client } from '$lib/db/dbClient';
import { generateShortPath } from '$lib/generateShortpath';

/** @type {import('./$types').Actions} */
export const actions = {
	/**
	 * @return {Promise<{err: string} | ShortLink>}
	 */
	shortLink: async ({ request }) => {
		const data = await request.formData();
		const url = data.get('url');

		if (!url) {
			return { err: 'URL not provided' };
		}

		if (!isValidURL(url.toString())) {
			return { err: 'URL is not valid' };
		}

		try {
			const existingShortLink = await client.execute({
				sql: 'select (shortpath) from links where url = :url limit 1',
				args: { url: url.toString() }
			});

			if (existingShortLink.rows.length) {
				/** @type {any} */
				const row = existingShortLink.rows[0];

				/** @type {ShortLink} */
				const shortpath = row;
				return shortpath;
			}

			const shortpath = generateShortPath();
			await client.execute({
				sql: 'insert into links (url, shortpath) values (:url, :shortpath)',
				args: { url: url.toString(), shortpath }
			});

			return {
				shortpath
			};
		} catch (e) {
			console.error(e);

			return {
				err: 'An error occurred, please try again.'
			};
		}
	}
};

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

/**
 * Represents a short link.
 * @typedef {Object} ShortLink
 * @property {string} shortpath - The short path of the link
 */
