<script>
	import _ from 'lodash'
	import { browser } from '$app/environment'
	import {assert, log} from '$lib/utils.js'

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

	let url =''
	let path = ''

	$: if (browser) url = window.location.href
	$: path = url.slice(21)

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

</script>

URL: {url} <br>
PATH: x{path}x <br>

{#each expand(path) as key}
	{@const name = clean(url,key)}
	{#if !key.endsWith('.jpg')}
		<p><button on:click={window.location.href = name}>{name}</button></p>
	{/if}
{/each}
