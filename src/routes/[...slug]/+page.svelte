<script>
	import _ from 'lodash'
	import { browser } from '$app/environment'
	import {goto} from '$app/navigation'
	import {assert, log} from '$lib/utils.js'
	import {stack} from '$lib/stores.js'
	import {page} from '$app/stores'

	export const prerender = true

	const menu = {
		a: {
			a1: {
				a11: 'a11.jpg',
				a12: 'a12.jpg'
			},	
			a2: {
				a21: 'a21.jpg',
				a22: 'a22.jpg'
			},
			a3: {
				a31: 'a31.jpg',
				a32: 'a32.jpg'
			}
		},
		b: {
			b1: {
				b11: 'b11.jpg',
				b12: 'b12.jpg'
			},
			b2: {
				b21: 'b21.jpg',
				b22: 'b22.jpg'
			},
			b3: {
				b31: 'b31.jpg',
				b32: 'b32.jpg'
			}
		}
	}

	// let path = ''

	// $: if (browser) 
	$: href = browser ? $page.url.href : ""
	// $: url = href //$stack.join('/')
	$: path = href.slice(21)
	$: log($page.url.pathname)

	const clean = (a,b) => a.endsWith('/') || b.startsWith('/') ?  a + b : a + '/' + b

	function makeItems(s) {
		if (s=='/') return []
		return _.drop(s.split('/'))
	}
	assert('mI1',makeItems('/'),     [] ) 
	assert('mI2',makeItems('/a'),    ['a'] ) 
	assert('mI3',makeItems('/a/a1'), ['a','a1'] ) 
	
	function expand(path) {
		let curr = menu
		for (const item of makeItems(path)) curr = curr[item]
		return _.keys(curr)
	}	
	assert('A1',''.split('/'), [''] ) 
	assert('A2','/a'.split('/'), ['','a'] ) 
	assert('B',expand('/'), ['a','b'])
	assert('C',expand('/a'), ['a1','a2', 'a3'])
	assert('D',expand('/a/a1'), ['a11','a12'])

	$: expanded = expand(path)

	// function push(item) {
		// $stack = _.concat($stack,item)
		// log('push',$stack)
	// 	goto(item)
	// }

</script>

<!-- url: {url} <br> -->
href: {href} <br>
expand: {expanded}<br>
page: {$page.params.slug} <br>
stack: {$stack} <br>

{#each expanded as key}
	{@const name = href.slice(href.lastIndexOf("/"))}
	{#if !key.endsWith('.jpg')}
		<!-- <a href = {clean(name,key)}>{clean(name,key)}</a><br> -->
		<p><button on:click={()=>goto(clean(name,key))}>{clean(name,key)}</button></p>
		<!-- <p><button on:click={window.location.href = clean(name,key)}>{clean(name,key)}</button></p> -->
		<!-- goto problematiskt, fler som har problem. Den är smooth, men uppdaterar inte fönstret. -->
	{/if}
{/each}


<p><button on:click={()=>$stack = _.concat($stack,1)}>{$stack.length}</button></p>
