<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import ArrowPath from '../img/arrow-path.svg';

	/** @type {import('./shortpathAction').ShortpathAction} */
	export let form;

	let baseUrl = '';
	onMount(() => {
		baseUrl = window.location.origin;
	});
	$: shortLink = `${baseUrl}/r/${form?.shortpath}`;

	let isLoading = false;
</script>

<h2 class="text-balance pt-2 text-center text-xl">
	Welcome to <span class="font-bold">Short Me</span>!
	<div>Transform lengthy URLs into concise, shareable links in seconds.</div>
</h2>

<form
	class="pt-5 text-center text-lg"
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
	<label for="url">
		<span class="font-bold">Drop & Shorten</span>!
		<div>Paste the URL you want compacted.</div>
	</label>
	<div class="mx-5 my-2 flex flex-col items-center justify-center gap-2">
		<input
			class="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
			type="url"
			id="url"
			name="url"
			required
			autocomplete="off"
			placeholder="Enter your long URL here..."
		/>
		<button
			class="flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
			type="submit"
		>
			<div class="absolute flex items-center justify-center">
				Shrink It!
				<img
					src={ArrowPath}
					alt="arrow path"
					class="absolute left-20 w-6 animate-spin"
					class:pause-animation={!isLoading}
					hidden={!isLoading}
				/>
			</div>
		</button>
	</div>
</form>

{#if isLoading}
	<p class="m-5 rounded-lg border-gray-300 bg-yellow-500 px-4 py-2 shadow-md">Shortening...</p>
{:else if form?.message}
	<h3 class="m-5 rounded-lg border-gray-300 bg-red-600 px-4 py-2 shadow-md">{form?.message}</h3>
{:else if form?.shortpath}
	<h3 class="m-5 rounded-lg border border-gray-300 bg-[#1bb429] px-2 py-1">
		Short link:
		<a href={shortLink} class="text-blue-700 underline underline-offset-2 hover:text-indigo-700">
			{shortLink}
		</a>
	</h3>
{/if}

<style>
	h2 {
		text-wrap: balance;
	}

	.pause-animation {
		animation-play-state: paused;
	}
</style>
