export default {
  list: {
    padding: '20px 20px 0 50px',
  },
  noRecords: {
    color: 'lightgrey',
    textAlign: 'center',
  },
  listItem: {
    padding: '5px',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    '& button': {
      cursor: 'pointer',
      background: 'transparent',
      border: 0,
      outline: 0,
    },
  },
  removeButton: {
    fontSize: '24px',
  },
  removeApprove: {
    fontSize: '18px',
    marginRight: '20px',
    color: 'red',
  },
  removeCancel: {
    fontSize: '18px',
    color: 'grey',
  },
}
