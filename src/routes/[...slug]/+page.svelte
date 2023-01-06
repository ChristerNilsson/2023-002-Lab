<script>
	import { browser } from '$app/environment'
	import {log} from '$lib/utils.js'

	const m = {}
		m['']     = ['a','b']
		m['a']    = ['a1', 'a2', 'a3']
		m['a/a1'] = ['a11', 'a12']
		m['a/a2'] = ['a21', 'a22']
		m['a/a3'] = ['a31', 'a32']
		m['b']    = ['b1', 'b2']
		m['b/b1'] = ['b11', 'b12']
		m['b/b2'] = ['b21', 'b22']
	const menu = m
	
	let url =''
	let path = ''
	// let arr=[]

	$: {
		if (browser) {
			url = window.location.href
		}
	}	
	$: {
		log(url)
		path = url.slice(22)
		log({path})
		log({menu})
	}

	$: arr = menu[path] 

	function clean(a,b) {
		if (a.endsWith('/') || b.startsWith('/')) {
			return a + b
		} else {
			return a + '/' + b
		}
	}

</script>

URL: {url} <br>
PATH: x{path}x <br>
ARR: {arr}

{#each arr as item}
	{@const name = clean(url,item)}
	<p>
		<button on:click={window.location.href = name}>{item}</button>
	</p>
{/each}

