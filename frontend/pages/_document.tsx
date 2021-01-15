import { Children } from 'react'
import { ServerStyleSheets } from '@material-ui/core'
import Document, {
  Html, Head, Main, NextScript
} from 'next/document'
import theme from '../components/utils/theme'

export default class BluboDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <link href='https://fonts.googleapis.com/css?family=Fjalla+One' rel='stylesheet' as='Fjalla One' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

BluboDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: App => props => sheets.collect(<App {...props} />)
  })
  
  const initalProps = await Document.getInitialProps(ctx)
  return {
    ...initalProps,
    styles: [
      ...Children.toArray(initalProps.styles),
      sheets.getStyleElement()
    ]
  }
}
