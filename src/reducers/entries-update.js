export default (
	state = {
		list: [],
		loaded: false,
		loading: false,
		error: ''
	},
	action
) => {
	switch (action.type) {
		case 'ADD_RECORD_FULFILLED':
			const record = action.payload
			const oldEntry = state.list.find(e => e.id === record.entryId)
			const upEntry = {...oldEntry, records: oldEntry.records.concat([record])}
			state = {
				...state,
				list: immutableMerge(state.list, upEntry),
				loading: false,
				loaded: true
			}
			break
		case 'ADD_RECORD_PENDING':
		case 'GET_ENTRIES_PENDING':
		  state = { ...state, loading: true }
		  break
		case 'ADD_RECORD_REJECTED':
		case 'GET_ENTRIES_REJECTED':
		  state = { ...state, loading: false, error: action.payload }
		  break
		case 'GET_ENTRIES_FULFILLED':
			state = {
				...state,
				list: immutableMerge(state.list, action.payload),
				loading: false,
				loaded: true
			}
			break
		default:
			return state
		}
	return state
}

function immutableMerge(base, incoming) {
	return Array.isArray(incoming)
		? immutableMergeArr(base, incoming)
		: immutableMergeItem(base, incoming)
}

function immutableMergeItem(array, item) {
	const uplist = [item]
	return uplist.concat(array.filter(i => i.day !== item.day))
}
function immutableMergeArr(base, incoming) {
	const incValues = incoming.map(i => i.day)
	return incoming.concat(base.filter(i => !incValues.includes(i.day)))
}
