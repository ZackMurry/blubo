import { FC, useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import '../styles/globals.css'
import theme from '../components/utils/theme'

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Blubo</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
