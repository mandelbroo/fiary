export default {
  wrapper: {
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleWrapper: {
    marginTop: '22px',
    marginBottom: '22px',
    display: 'block',
    textDecoration: 'none',
    fontSize: '30px',
    letterSpacing: '2px',
    '& a': {
      color: '#000',
    },
    '& a:visited': {
      color: '#000',
    },
  },
  content: {
    marginBottom: '30px',
  },
}
