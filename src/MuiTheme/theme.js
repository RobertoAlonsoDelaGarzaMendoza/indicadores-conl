import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    typography:{
        fontFamily:'"PT Sans"',
        fontSize:14,
        fontWeightLight:400,
        fontWeightRegular:400,
        fontWeightMedium:700,
        fontWeightBold:700

    },
    palette:{
        type:"light",
        primary:{
            main: '#5a2149'
        },
        secondary:{
            main : '#00b1b0',
            contrastText:"#ffff"
        }
    }
});
