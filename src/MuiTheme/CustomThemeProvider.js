import { ThemeProvider } from '@material-ui/core'
import React from 'react'
import { theme } from './theme'

function CustomThemeProvider({children}) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default CustomThemeProvider
