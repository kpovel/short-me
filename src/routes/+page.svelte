<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	/** @type {import('./shortpathAction').ShortpathAction} */
	export let form;

	let baseUrl = '';
	onMount(() => {
		baseUrl = window.location.origin;
	});
	$: shortLink = `${baseUrl}/r/${form?.shortpath}`;

	let isLoading = false;
</script>

<h1>Short me</h1>
<form
	method="POST"
	action="?/shortLink"
	use:enhance={() => {
		isLoading = true;
		return async ({ update }) => {
			await update();
			isLoading = false;
		};
	}}
>
	<label>
		Paste the URL to be shortened
		<input type="url" name="url" required autocomplete="off" />
		<button type="submit">Short link</button>
	</label>
</form>

{#if isLoading}
	<p>Shortening...</p>
{:else if form?.message}
	<h3 class="text-red-500">{form?.message}</h3>
{:else if form?.shortpath}
	<h3>
		Short link:
		<a class="text-blue-700 underline hover:text-indigo-700" href={shortLink}>
			{shortLink}
		</a>
	</h3>
{/if}
