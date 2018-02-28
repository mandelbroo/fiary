export default (
	state = {
		entry: {},
		loaded: false,
		loading: false,
		error: ''
	},
	action
) => {
	switch (action.type) {
		case 'GET_TODAY_RECORDS_PENDING':
		  state = { ...state, loading: true }
		  break
		case 'GET_TODAY_RECORDS_REJECTED':
		  state = { ...state, loading: false, error: action.payload }
		  break
		case 'GET_TODAY_RECORDS_FULFILLED':
			state = {
				...state,
				entry: action.payload,
				loading: false,
				loaded: true
			}
			break
		default:
			return state
		}
	return state
}
