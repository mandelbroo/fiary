export default {
  side: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '50px',
    '& img': {
      marginLeft: '15px',
      width: '80px',
      transform: 'rotate(190deg)',
    },
  },
  title: {
    marginTop: '20px',
    fontSize: '28px',
    letterSpacing: '1px',
  },
  item: {
    padding: '10px',
    fontSize: '20px',
  },
}
