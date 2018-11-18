import { DESKTOP, MOBILE, colorBrand } from '../consts-styles'

const AMOUNT_FONT_SIZE = '3rem'

export default {
  container: {
    [DESKTOP]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  form: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    '& input': {
      'border-style': 'none',
    },
  },
  plus: {
    color: 'green',
  },
  minus: {
    color: 'red',
  },
  currency: {
    fontSize: '2rem',
  },
  check: {
    height: '0px',
    width: '0px',
  },
  amount: {
    fontSize: AMOUNT_FONT_SIZE,
    height: '75px',
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
  },
  amountInput: {
    fontSize: AMOUNT_FONT_SIZE,
    height: '75px',
    width: '100%',
    background: 'transparent',
    caretColor: 'transparent',
    color: 'transparent',
    textAlign: 'center',
    '&:focus': {
      outline: 'none',
    },
  },
  sendButton: {
    border: 0,
    backgroundColor: 'transparent',
    padding: 0,
    marginTop: '20px',
    '&:focus': {
      outline: 'none',
    },
    '& svg': {
      fontSize: 42,
      fill: colorBrand,
    },
  },
}
