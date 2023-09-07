<script>
	let url = '';
	let isLoading = false;

	const submitData = {
		shortlink: '',
		errorMessage: ''
	};

	async function handleSubmit() {
		isLoading = true;

		const responce = await fetch('/api/shortLink', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url })
		});

		const json = await responce.json();
		if (responce.ok) {
			const baseUrl = window.location.origin;
			submitData.shortlink = `${baseUrl}/r/${json.shortpath}`;
			submitData.errorMessage = '';
		} else {
			submitData.errorMessage = json.message;
		}

		isLoading = false;
	}
</script>

<h1>Short me</h1>
<form method="POST" on:submit|preventDefault={handleSubmit}>
	<label>
		Paste the URL to be shortened
		<input type="url" name="url" required autocomplete="off" bind:value={url} />
		<button type="submit">Short link</button>
	</label>
</form>

{#if isLoading}
	<p>Shortening...</p>
{:else if submitData.errorMessage}
	<h3 class="text-red-500">{submitData.errorMessage}</h3>
{:else if submitData.shortlink}
	<h3>
		Short link:
		<a class="text-blue-700 underline hover:text-indigo-700" href={submitData.shortlink}>
			{submitData.shortlink}
		</a>
	</h3>
{/if}
