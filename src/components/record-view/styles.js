export default {
	container: {
		position: 'relative',
	},
	plus: {
		color: 'green',
		paddingRight: '4px',
		'&::after': {
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
	},
	tag: {
		paddingRight: '4px'
	}
}