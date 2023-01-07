<script>
	import _ from 'lodash'
	import {goto} from '$app/navigation'
	import {assert, log} from '$lib/utils.js'
	import {page} from '$app/stores'
	import menu from '$lib/bilder.json'
	export const prerender = true

	const menu_xxx = {
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
		for (const item of makeItems(path)) {
			log(item)
			curr = curr[item]
		}
		log('expand',path,_.keys(curr))
		return _.keys(curr)
	}	
	// assert('A1',''.split('/'), [''] ) 
	// assert('A2','/a'.split('/'), ['','a'] ) 
	// assert('B',expand('/'), ['a','b'])
	// assert('C',expand('/a'), ['a1','a2', 'a3'])
	// assert('D',expand('/a/a1'), ['a11','a12'])

	function clean(a,b) {
		if (!a.startsWith('/')) a = '/' + a
		if (a.endsWith('/') || b.startsWith('/')) {
			return a + b
		} else {
			return a + '/' + b
		}
	}

	$: url = $page.url
	$: params = $page.params
	$: log(params)
	$: slug = params.slug
	$: pathname = decodeURI(url.pathname)
	$: expanded = expand(pathname)
	$: log({expanded})

</script>

{#each expanded as key}
	{@const name = clean(pathname,key)} 
	<button on:click={()=>goto(name)}>{key}</button><br>
{/each}

<style>
	button {
		width:650px;
		text-align:left
	}
</style>