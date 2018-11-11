import { DESKTOP } from '../consts-styles'

export default {
  container: {
    [DESKTOP]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
