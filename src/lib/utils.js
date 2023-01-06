import _ from 'lodash'

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

