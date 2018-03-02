export default (state = '', action) => {
	switch (action.type) {
		case 'EDIT_ENTRY':
			state = action.payload
			break
		case 'CLEAR_EDIT':
			state = ''
			break
		default:
	}
	return state
}
