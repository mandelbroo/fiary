export default (state = '', action) => {
	if (action.type === 'TODAY_DATE')
		state = action.payload
	return state
}
