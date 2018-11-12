import { DESKTOP, MOBILE } from '../consts-styles'
import { button } from '../common-styles'

export default {
  container: {
    [DESKTOP]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  button: {
    ...button,
    display: 'block',
    margin: '40px auto',
    width: '200px',
    textTransform: 'none',
    [MOBILE]: {
      fontSize: '16px',
    },
  },
  month: {
    color: '#9f9da0',
    position: 'relative',
    left: 30,
    '&:before': {
      content: '""',
      width: '18px',
      height: '1px',
      backgroundColor: '#9f9da0',
      position: 'absolute',
      margint: 'auto',
      left: -25,
      top: '0.5rem',
    },
  },
}
