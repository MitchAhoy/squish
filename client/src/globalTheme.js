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
    }
})

export default theme