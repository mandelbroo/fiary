import { MOBILE, DESKTOP, colorBrand } from '../consts-styles'
import { button } from '../common-styles'

export default {
  form: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [DESKTOP]: {
      maxWidth: '250px',
    },
    [MOBILE]: {
      maxWidth: '200px',
    },
  },
  input: {
    border: 'solid 1px lightgray',
    borderRadius: '5px',
    padding: '8px 12px',
    outline: 0,
    '&:focus': {
      border: 'solid 1px transparent',
      boxShadow: '0 4px 8px 0px rgba(0,0,0,0.3)',
    },
    '&:not(:last-of-type)': {
      marginBottom: '10px',
    },
    [MOBILE]: {
      fontSize: '20px',
    },
  },
  button: {
    ...button,
    marginTop: '10px',
    backgroundColor: colorBrand,
    color: 'white',
    border: `solid 1px ${colorBrand}`,
  },
}
