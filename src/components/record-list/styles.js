import { DESKTOP } from 'components/consts-styles'

export default {
  list: {
    padding: '20px 30px 0 50px',
    [DESKTOP]: {
      width: '800px',
      margin: '0 auto',
    },
  },
  noRecords: {
    color: 'lightgrey',
    textAlign: 'center',
    padding: '20px 0',
  },
  listItem: {
    padding: '5px 0',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '2.5rem',
    position: 'relative',
    '& button': {
      cursor: 'pointer',
      background: 'transparent',
      border: 0,
      outline: 0,
    },
  },
  removeWrapper: {
    background: 'white',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
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
