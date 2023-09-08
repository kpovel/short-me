/** @type {import('./$types').Actions} */
export const actions = {
  shortLink: async ({ request, url }) => {
    const data = await request.formData();

    const responce = await fetch(`${url.origin}/api/shortLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: data.get('url') })
    });

    return await responce.json();
  }
};
