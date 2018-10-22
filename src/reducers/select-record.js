export default (state = null, action) => {
  switch (action.type) {
    case 'SELECT_RECORD':
      state = action.payload
      break
    case 'CLEAR_SELECTED_RECORD':
      state = null
      break
    default:
      return state
  }
  return state
}
