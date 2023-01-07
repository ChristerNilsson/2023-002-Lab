<script>
	import _ from 'lodash'
	import {goto} from '$app/navigation'
	import {page} from '$app/stores'
	import menu from '$lib/bilder.json'
	import {clean,getChildren} from '$lib/utils.js'

	export const prerender = true

	$: url = $page.url
	$: pathname = decodeURI(url.pathname.slice(1)) // ta bort inledande /. Kan finnas %20 och andra tecken.
	$: children = getChildren(menu,pathname) // De omedelbara barnen till en nod.

</script>

{#each children as key}
	{@const name = clean(pathname,key)} 
	<button on:click={()=>goto(name)}>{key}</button><br>
{/each}

<style> button {width:650px; text-align:left}</style>
