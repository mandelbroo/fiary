export default {
  main: {
    '& input': {
      fontSize: 20,
      borderStyle: 'none',
      '&:focus': {
        outline: 'none',
      },
    },
    '& .tag': {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '3px',
      display: 'inline-block',
      cursor: 'pointer',
      padding: '1px 4px',
      '&:not(:first-child)': {
        marginRight: '10px',
      },
    },
  },
}
