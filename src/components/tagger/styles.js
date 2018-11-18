export default {
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& input': {
      fontSize: 20,
      borderStyle: 'none',
      display: 'inline-block',
      width: 150,
      marginBottom: 10,
      '&:focus': {
        outline: 'none',
      },
    },
    '& .tag': {
      fontSize: 20,
      border: 'solid 1px black',
      borderRadius: 3,
      cursor: 'pointer',
      padding: '8px',
      display: 'inline-block',
      marginBottom: 10,
      '&:not(:last-child)': {
        marginRight: 10,
      },
    },
    '& .suggest': {
      border: 'solid 1px grey',
      color: 'grey',
    },
  },
}
