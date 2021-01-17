import { parse } from 'cookie'
import { Grid, Paper } from '@material-ui/core'
import { GetServerSideProps, NextPage } from 'next'
import BookPreview from '../components/book/BookPreview'
import Logo from '../components/Logo'
import theme from '../components/utils/theme'
import redirectToLogin from '../components/utils/redirectToLogin'
import ErrorAlert from '../components/alert/ErrorAlert'
import BookEntity from '../components/utils/types/BookEntity'
import ImportBook from '../components/book/ImportBook'

interface Props {
  books?: BookEntity[]
  errorText?: string
  jwt?: string
}

const HomePage: NextPage<Props> = ({ books, errorText, jwt }) => (
  <div style={{ backgroundColor: theme.palette.primary.main, width: '100%', height: '100vh' }}>
    <Logo size='small' white />
    <Paper style={{ width: '75%', margin: '0 auto', padding: 25 }}>
      <Grid container spacing={4}>
        {
          books && books.map(book => (
            <Grid item xs={3} lg={2} key={book.id}>
              <BookPreview {...book} />
            </Grid>
          ))
        }
        <Grid item xs={3} lg={2}>
          <ImportBook jwt={jwt} />
        </Grid>
      </Grid>
    </Paper>
    {
      errorText && <ErrorAlert text={errorText} disableClose />
    }
  </div>
)

export default HomePage

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
  let jwt: string | null = null
  if (req.headers?.cookie) {
    jwt = parse(req.headers.cookie).jwt
  }
  if (!jwt) {
    redirectToLogin(res, '/home')
    return {
      props: {}
    }
  }
  // const domain = process.env.NODE_ENV !== 'production' ? 'http://localhost' : 'https://blubo.zackmurry.com'
  const domain = 'http://localhost'
  const response = await fetch(domain + '/api/v1/books?limit=5', {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  if (response.ok) {
    const books = await response.json()
    return {
      props: {
        books,
        jwt
      }
    }
  }
  return {
    props: {
      errorText: 'There was an error fetching your books. Status code: ' + response.status
    }
  }
}
