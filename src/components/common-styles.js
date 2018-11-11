import { MOBILE } from './consts-styles'

export const button = {
  backgroundColor: 'white',
  color: 'black',
  border: `solid 1px lightgray`,
  outline: 0,
  borderRadius: '5px',
  width: '120px',
  padding: '10px',
  textTransform: 'uppercase',
  fontWeight: '700',
  letterSpacing: '0.3px',
  '&:focus': {
    border: 'solid 1px white',
    boxShadow: '0 4px 8px 0px rgba(0,0,0,0.3)',
  },
  [MOBILE]: {
    fontSize: '20px',
    padding: '10px 20px',
  },
}
