export default {
  modal: {
    width: '90%',
    height: '25%',
    marginTop: '50%',
    zIndex: 11,
    border: 'none',
    display: 'block',
    borderRadius: '3px',
    '& section': {
      top: '15%',
      display: 'block',
      width: '100%',
      position: 'relative',
    },
    '& div': {
      top: '30%',
      position: 'relative',
      '& button': {
        display: 'table-cell'
      }
    }
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
    display: 'block'
  },
  hide: {
    display: 'none'
  },
}
