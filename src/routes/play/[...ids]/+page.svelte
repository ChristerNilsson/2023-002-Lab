<script>
	import {selection} from '$lib/stores.js'
	import { Body } from 'svelte-body'
	import { fade } from 'svelte/transition'
	import _ from 'lodash'

	const DELAY = 5000 // ms
	const GAP = 30
	let i=0

	$: data = $selection[i]
	$: bw = data[3-3]
	$: bh = data[4-3]
	$: md5 = data[5]
	$: path = data[6]
	$: href = '/small/' + md5 + '.jpg'
	$: key = _.last(path.split('/')).replaceAll('_',' ').replace('.jpg','').replace('Vy-','')

	setInterval(() => {i = (i+1) % $selection.length}, DELAY)

	$: skala  = Math.min((innerHeight-GAP)/bh, innerWidth/bw)
	$: width  = Math.round(bw * skala)
	$: height = Math.round(bh * skala)
	$: left   = Math.round((innerWidth - width)/2)
	$: top    = GAP

</script>

<Body style="background-color: black; color:white" />

<div >
	<div style='text-align:center;'>{key}</div>
	{#if i%2==0}
		<img transition:fade style="position:absolute;left:{left}px;top:{top}px;" width={width}px  src={href} alt="">
	{:else}
		<img transition:fade style="position:absolute;left:{left}px;top:{top}px;" width={width}px  src={href} alt="">
	{/if}
</div>

<style>
	 img {border-radius: 1%}
</style>
