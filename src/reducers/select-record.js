export default (state = '', action) => {
	switch (action.type) {
		case 'SELECT_RECORD':
			state = action.payload
			break
		case 'CLEAR_SELECTED_RECORD':
			state = ''
			break
		default:
			return state
	}
	return state
}
