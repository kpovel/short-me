import { client } from '$lib/db/dbClient';

/** @type {import('./$types').Actions} */
export const actions = {
	shortLink: async ({ request, url }) => {
		const data = await request.formData();

		const existingShortLink = await client.execute({
			sql: 'select (shortpath) from links where url = :url limit 1',
			args: { url: data.get('url')?.toString() ?? '' }
		});

    if (existingShortLink.rows.length) {
      return existingShortLink.rows[0];
    }

		const responce = await fetch(`${url.origin}/api/shortLink`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url: data.get('url') })
		});

		return await responce.json();
	}
};
