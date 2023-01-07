import _ from 'lodash'

export const log = console.log

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

export function clean(a,b) {
	if (!a.startsWith('/')) a = '/' + a
	return a.endsWith('/') || b.startsWith('/') ? a + b : a + '/' + b
}
assert('C1', clean('/','2011'),'/2011')
assert('C2', clean('/2022', '2022--2023 Allsvenskan Division III_T10438'),'/2022/2022--2023 Allsvenskan Division III_T10438')
assert('C3', clean('/2022/2022-07-02_Schack-SM Uppsala_I10044',"Weekend-2"), "/2022/2022-07-02_Schack-SM Uppsala_I10044/Weekend-2")
