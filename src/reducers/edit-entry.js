export default (state = '', action) => {
  switch (action.type) {
    case 'EDIT_ENTRY':
      state = action.payload
      break
    case 'EDIT_ENTRY_CLEAR':
      state = ''
      break
    default:
  }
  return state
}
