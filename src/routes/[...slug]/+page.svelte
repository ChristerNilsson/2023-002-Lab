<script>
	import _ from 'lodash'
	// import { browser } from '$app/environment'
	import {goto} from '$app/navigation'
	import {assert, log} from '$lib/utils.js'
	// import {stack} from '$lib/stores.js'
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

	function makeItems(s) {
		if (s=='/') return []
		return _.drop(s.split('/'))
	}
	assert('mI1',makeItems('/'),     [] ) 
	assert('mI2',makeItems('/a'),    ['a'] ) 
	assert('mI3',makeItems('/a/a1'), ['a','a1'] ) 
	
	function expand(path) {
		log(path)
		let curr = menu
		for (const item of makeItems(path)) curr = curr[item]
		return _.keys(curr)
	}	
	assert('A1',''.split('/'), [''] ) 
	assert('A2','/a'.split('/'), ['','a'] ) 
	assert('B',expand('/'), ['a','b'])
	assert('C',expand('/a'), ['a1','a2', 'a3'])
	assert('D',expand('/a/a1'), ['a11','a12'])

	$: expanded = expand($page.url.pathname)

</script>

{#each expanded as key}
	{@const name = $page.params.slug + '/' + key} 
	{#if !key.endsWith('.jpg')}
		<p><button on:click={()=>goto(name)}>{name}</button></p>
	{/if}
{/each}

<!-- <p><button on:click={()=>$stack = _.concat($stack,1)}>{$stack.length}</button></p> -->
