import { DESKTOP, MOBILE, INPUT_FONT_SIZE } from '../consts-styles'

export default {
	container: {
		[DESKTOP]: {
			display: 'flex',
			justifyContent: 'center'
		},
    [MOBILE]: {
			bottom: 0,
			position: 'fixed',
  		width: '100%',
  		zIndex: 1,
		}
	},
	form: {
		padding: '5px',
		'& input': {
			'border-style': 'none'
		},
	},
	plus: {
		fontSize: INPUT_FONT_SIZE,
		padding: '5px',
		'&::after': {
			color: 'green',
			content: '"+"'
		}
	},
	minus: {
		fontSize: INPUT_FONT_SIZE,
		padding: '5px',
		'&::after': {
			content: '"−"'
		}
	},
	check: {
		height: '0px',
		width: '0px'
	},
	amount: {
		fontSize: INPUT_FONT_SIZE,
		width: '80%',
		display: 'inline-block',
		padding: 0,
		marginLeft: '6px',
		'&:focus': {
			outline: 'none'
		}
	},
	left: {
		// width: '40%',
		// display: 'table-cell',
		'& div': {
			textAlign: 'center'
		}
	},
	right: {
		display: 'table-cell'
	},
	button: {
		display: 'table-cell',
		'& input': {
			display: 'block',
			width: '40px',
			backgroundColor: 'white',
			color: '#0093bc',
			fontSize: INPUT_FONT_SIZE + 6,
			padding: 0,
			'&:focus': {
				outline: 'none'
			}
		},
	}
}
