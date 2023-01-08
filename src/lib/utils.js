import _ from 'lodash'
import menu from '$lib/menu.json'

export const log = console.log

export function assert (msg,a,b) {
	if (!_.isEqual(a,b)) {
		log('Assert',msg, 'failed')
		log('  a:',a)
		log('  b:',b)
	} else {
		// log('Assert',msg,'ok')
	}
}

export const splitPath = (s) => s=='' ? [] : s.split('/')
assert('mI1',splitPath(''),     [] )
assert('mI2',splitPath('a'),    ['a'] )
assert('mI3',splitPath('a/a1'), ['a','a1'] )

export function getChildren(curr,path) {
	for (const item of splitPath(path)) curr = curr[item]
	return _.keys(curr)
}
assert('B',getChildren(menu,''), ['a','b'])
assert('C',getChildren(menu,'a'), ['a1', 'a2', 'a3'])
assert('D',getChildren(menu,'a/a1'), ['a11','a12'])

export function traverse(curr,path) {
	for (const item of splitPath(path)) curr = curr[item]
	return curr
}

// export function getObject(curr,path) {
// 	curr = traverse(curr,path)
// }

export function getLeaves(curr,path) {
	const res = []
	function recurse(curr,path) {
		if (path.toLowerCase().endsWith('.jpg')) {
			res.push(path)
		} else {
			for (const key of _.keys(curr)) {
				recurse(curr[key],path + '/' + key)
			}
		}
	}
	log(path)
	recurse(traverse(curr,path),path)
	return res
}

export function clean(a,b) {
	if (!a.startsWith('/')) a = '/' + a
	return a.endsWith('/') || b.startsWith('/') ? a + b : a + '/' + b
}
assert('C1', clean('/','2011'),'/2011')
assert('C2', clean('/2022', '2022--2023 Allsvenskan Division III_T10438'),'/2022/2022--2023 Allsvenskan Division III_T10438')
assert('C3', clean('/2022/2022-07-02_Schack-SM Uppsala_I10044',"Weekend-2"), "/2022/2022-07-02_Schack-SM Uppsala_I10044/Weekend-2")

// assert(0,'Ab'.toLowerCase(), 'ab')
// assert(1,'Ab'.toUpperCase(), 'AB')
// for (const item in "ab") log(item) 0,1
// for (const item of "ab") log(item) a,b

// keyword|for (item in IN)|for item in IN:|a,b|a,b
// keyword|for (item of IN)|for item in range(len(IN)):|a,b|0,1
// keyword|for (item in IN)|for item in IN:|a:3,b:4|a,b
// keyword|for (item in IN)|for item in range(len(IN)):|a:3,b:4|3,4