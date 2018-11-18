export default {
  container: {
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    flexWrap: 'wrap',
    paddingRight: '15px',
  },
  plus: {
    color: 'green',
    paddingRight: '4px',
    display: 'flex',
    alignItems: 'center',
    '&:after': {
      content: '"+"',
      position: 'absolute',
      left: '-13px',
    },
  },
  minus: {
    paddingRight: '4px',
    '&:before': {
      content: '"-"',
      position: 'absolute',
      left: '-13px',
    },
    display: 'flex',
    alignItems: 'center',
  },
  tag: {
    paddingRight: '4px',
    display: 'flex',
    alignItems: 'center',
  },
}
