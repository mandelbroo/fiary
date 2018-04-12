export default (day) => {
	return {
		type: 'EDIT_ENTRY',
		payload: day
	}
}
export function clearEdit() {
	return {
		type: 'CLEAR_EDIT'
	}
}
