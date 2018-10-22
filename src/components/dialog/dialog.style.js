import { DESKTOP, MOBILE } from 'components/consts-styles'

export default {
  modal: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '0 auto',
    zIndex: 11,
    border: 'none',
    borderRadius: '3px',
    [DESKTOP]: {
      width: '500px',
      height: '300px',
    },
    [MOBILE]: {
      width: '90vw',
      height: '50vh',
    },
  },
  shadow: {
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'opacity 0.3s ease-out, visibility 0.3s ease-out',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  show: {
    display: 'flex',
    alignItems: 'center',
  },
  hide: {
    display: 'none',
  },
}
