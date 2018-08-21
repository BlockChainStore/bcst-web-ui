import { createMuiTheme } from '@material-ui/core/styles'


export default createMuiTheme({
    palette: {
        primary: {
            main: '#0088cc'
        }
    },
    custom: {
        drawerWidth: 240
    },
    typography:{
        display2: {
            fontFamily: 'Montserrat UltraLight'
        }
    }
})