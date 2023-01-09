<script>
	import _ from 'lodash'
	import {goto} from '$app/navigation'
	import {page} from '$app/stores'
	import {clean,getChildren,getLeaves,log,traverse} from '$lib/utils.js'

	export const prerender = true

	let menu = {}
	async function fetchData() {
		const res = await fetch('../src/lib/bilder.json')
		const data = await res.json()
		if (res.ok) {
			menu = data
			return data
		} else {
			throw new Error(data)
		}
	}

	$: url = $page.url
	$: pathname = decodeURI(url.pathname.split('/').slice(2).join('/')) // ta bort inledande /. Kan finnas %20 och andra tecken.
	$: children = getChildren(menu,pathname) // De omedelbara barnen till en nod.
	$: leaves = getLeaves(menu,pathname)

	// $: log({children})
	// $: log({pathname})
	// $: log({url})
	// $:log(url.pathname.split('/').slice(2))
	// $: log(leaves)

	$: pathnames = leaves.filter((leaf => leaf.includes(sokruta))).slice(0,100)

	let sokruta = 'Numa'
</script>

<input type="text" bind:value={sokruta}>
{pathnames.length} <br>

{#await fetchData()}
	<p>loading</p>
{:then xxx}

	{#each children as key}
		{@const name = clean(pathname,key)} 
		<button on:click={()=>goto('/Home' + name)}>{key}</button><br>
	{/each}

	{#each pathnames as pn}
		{pn}
		{#if pn.endsWith('.jpg')}
			{#if pn.includes(sokruta)}
				{@const data = traverse(menu, pn)}
				{@const href = "/small/" + data[5] + '.jpg' }
				<img src={href} alt=""> 
			{/if} <br>
		{/if}
	{/each}

{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style> button {width:650px; text-align:left}</style>