import {
  DESKTOP,
  MOBILE,
  zIndexModal,
  screenMaxHeight,
  screenMinHeight,
} from 'components/consts-styles'

export default {
  shadow: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'opacity 0.3s ease-out, visibility 0.3s ease-out',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: zIndexModal,
  },
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
    border: 'none',
    borderRadius: '3px',
    [DESKTOP]: {
      width: '500px',
      minHeight: '30px',
      padding: '20px',
    },
    [MOBILE]: {
      width: '100%',
      height: '100%',
    },
  },
  show: {
    display: 'flex',
    alignItems: 'center',
  },
  hide: {
    display: 'none',
  },
  childWrapper: {
    width: '100%',
    height: '100%',
    [screenMaxHeight(500)]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    [screenMinHeight(500)]: {
      marginTop: '20%',
    },
  },
  closeButton: {
    border: 0,
    background: 'transparent',
    position: 'absolute',
    left: 20,
    top: 20,
  },
}
