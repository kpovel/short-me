import { createClient } from '@libsql/client';
import { DB_URL, DB_TOKEN } from '$env/static/private';
import { dev } from '$app/environment';

function dbClient() {
	if (dev) {
		return createClient({
      url: "file:db/dev.db",
		});
	}

	return createClient({
		url: DB_URL,
		authToken: DB_TOKEN
	});
}

export const client = dbClient();
