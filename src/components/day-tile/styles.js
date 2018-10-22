import { DESKTOP } from '../consts-styles'

export default {
  tile: {
    boxShadow: '1px 1px 1px 1px lightgrey',
    margin: '10px 5%',
    borderRadius: '10px',
    padding: '15px 30px 15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    [DESKTOP]: {
      width: '50%',
    },
  },
  weekday: {
    fontSize: '12px',
  },
  date: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  numbers: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'right',
    fontSize: '20px',
  },
  income: {
    color: 'green',
    '&::before': {
      content: '"+"',
    },
  },
  expense: {
    color: 'red',
    '&::before': {
      content: '"-"',
    },
  },
  blank: {
    color: 'gray',
    fontSize: '14px',
  },
}
