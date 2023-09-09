<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>Short me</title>
</svelte:head>

<header class="flex h-16 items-center justify-center text-4xl font-bold text-transparent">
	<h1 class="bg-gradient-to-br from-fuchsia-500 to-violet-700 bg-clip-text text-center">
		<a href="/"> Short Me</a>
	</h1>
</header>

<hr class="mb-3 border-t-gray-500" />

<main>
	<slot />
</main>
