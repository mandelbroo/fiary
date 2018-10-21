import { colorBrand, zIndexHamburger } from 'components/consts-styles'
const width = 30

export default {
  wrapper: {
    position: 'absolute',
    right: '25px',
    top: '25px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    width: `${width}px`,
    height: '24px',
    zIndex: zIndexHamburger,
  },
  inner: {
    position: 'absolute',
    width: `${width}px`,
    height: '4px',
    borderRadius: '4px',
    backgroundColor: colorBrand,
    left: 0,
    top: 0,
    transition: 'transform .15s ease',
    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      top: '10px',
      width: `${width}px`,
      height: '4px',
      borderRadius: '4px',
      backgroundColor: colorBrand,
      opacity: 1,
      transitionTimingFunction: 'ease',
      transitionDuration: '.15s',
      transitionProperty: 'transform, opacity',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '20px',
      width: `${width}px`,
      height: '4px',
      borderRadius: '4px',
      backgroundColor: colorBrand,
      transition: 'transform .15s ease',
    },
    '&.active': {
      transform: 'translate3d(0,10px,0) rotate(45deg)',
      '&::before': {
        transform: 'rotate(-45deg) translate3d(-5.71429px, -6px, 0)',
        opacity: 0,
      },
      '&::after': {
        transform: 'translate3d(0,-20px,0) rotate(-90deg)',
      },
    },
  },
}
