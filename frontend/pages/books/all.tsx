import { parse } from 'cookie'
import { Fragment } from 'react'
import Link from 'next/link'
import { Grid, Paper, Typography } from '@material-ui/core'
import { GetServerSideProps, NextPage } from 'next'
import Logo from '../../components/Logo'
import BookEntity from '../../components/utils/types/BookEntity'
import redirectToLogin from '../../components/utils/redirectToLogin'
import ErrorAlert from '../../components/alert/ErrorAlert'

interface Props {
  books?: BookEntity[]
  errorText?: string
}

const AllBooks: NextPage<Props> = ({ books, errorText }) => (
  <div>
    <div style={{ position: 'absolute', left: 50, top: 25 }}>
      <Link href='/home'>
        <a href='/home'>
          <Logo size='small' white />
        </a>
      </Link>
    </div>
    <Paper
      style={{
        width: '60%',
        margin: '5% auto',
        padding: 50,
        marginTop: 125
      }}
    >
      <Typography variant='h3' style={{ fontSize: 36, textAlign: 'center' }}>
        All books
      </Typography>
      <Grid container spacing={3} style={{ margin: '15px 50px' }}>
        {
          (books && books.length)
            ? (
              <>
                <Grid item xs={6}>
                  <Typography style={{ fontWeight: 600 }}>
                    Title
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography style={{ fontWeight: 600 }}>
                    Author
                  </Typography>
                </Grid>
              </>
            )
            : (
              <Typography style={{ fontWeight: 500 }}>
                You don't have any books!
              </Typography>
            )
        }
        {
          Boolean(books && books.length) && books.map(({ title, author, id }) => (
            <Fragment key={id}>
              <Grid item xs={6}>
                <Link href={`/books/${id}`}>
                  <a href={`/books/${id}`}>
                    <Typography style={{ textDecoration: 'underline', fontSize: 14 }}>
                      {title}
                    </Typography>
                  </a>
                </Link>
              </Grid>
              <Grid item xs={6}>
                {author || 'Author not entered'}
              </Grid>
            </Fragment>
          ))
        }
      </Grid>
    </Paper>
    {
      errorText && <ErrorAlert disableClose text={errorText} />
    }
  </div>
)

export default AllBooks

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
  let jwt: string | null = null
  if (req.headers?.cookie) {
    jwt = parse(req.headers.cookie)?.jwt
  }
  if (!jwt) {
    redirectToLogin(res, '/books/all')
    return {
      props: {}
    }
  }

  const domain = process.env.NODE_ENV !== 'production' ? 'http://localhost' : 'https://blubo.zackmurry.com'
  const response = await fetch(domain + '/api/v1/books', {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  if (response.ok) {
    return {
      props: {
        books: await response.json()
      }
    }
  }
  let errorText: string | null = null
  if (response.status === 401 || response.status === 403) {
    errorText = 'You must be sign in to view your books'
  } else if (response.status === 400) {
    errorText = 'There was a problem fetching your books'
  } else if (response.status === 500) {
    errorText = 'A server error occured during your request. Please try again'
  } else {
    errorText = 'An unknown error occured during your request. Status code: ' + response.status
  }
  return {
    props: {
      errorText
    }
  }
}
