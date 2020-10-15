import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2B343B'
        },
        secondary: {
            main: '#626EE3',
        },
        text: {
            dark: '#34313A',
            light: '#FFFFFF'
        }
    },
    customShadow: {
        xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
     },
})

export default theme