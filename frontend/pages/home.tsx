import Link from 'next/link'
import { parse } from 'cookie'
import { Grid, Paper, Typography } from '@material-ui/core'
import { GetServerSideProps, NextPage } from 'next'
import BookPreview from '../components/book/BookPreview'
import Logo from '../components/Logo'
import theme from '../components/utils/theme'
import redirectToLogin from '../components/utils/redirectToLogin'
import ErrorAlert from '../components/alert/ErrorAlert'
import BookEntity from '../components/utils/types/BookEntity'
import ImportBook from '../components/book/ImportBook'
import PageLeaderboard from '../components/follow/PageLeaderboard'
import PublicUserInfo from '../components/utils/types/PublicUserInfo'
import FollowSection from '../components/follow/FollowSection'

interface Props {
  books?: BookEntity[]
  errorText?: string
  jwt?: string
  following?: PublicUserInfo[]
  userLeaderboard?: PublicUserInfo[]
}

const HomePage: NextPage<Props> = ({
  books, errorText, jwt, following, userLeaderboard
}) => (
  <div style={{ backgroundColor: theme.palette.primary.main, width: '100%', minHeight: '100vh' }}>
    <div style={{ padding: 5 }}>
      <Logo size='small' white />
    </div>
    <div style={{ width: '75%', margin: '0 auto' }}>
      <Paper style={{ width: '100%', padding: 25 }}>
        <Typography variant='h3' style={{ fontSize: 32 }}>
          Books
        </Typography>
        <Link href='/books/all'>
          <a href='/books/all'>
            <Typography
              style={{
                padding: '5px 10px',
                fontWeight: 300,
                textDecoration: 'underline'
              }}
            >
              View all
            </Typography>
          </a>
        </Link>
        <Grid container spacing={4}>
          {
            books && books.map(book => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={book.id}>
                <BookPreview {...book} />
              </Grid>
            ))
          }
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <ImportBook jwt={jwt} />
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={3} style={{ width: '100%', marginTop: 50 }}>
        <Grid item xs={12} lg={7}>
          <PageLeaderboard following={following} leaderboard={userLeaderboard} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <FollowSection jwt={jwt} />
        </Grid>
      </Grid>
    </div>
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
  const bookResponse = await fetch(domain + '/api/v1/books?limit=5', {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  let books: BookEntity[] | null = null
  if (bookResponse.ok) {
    books = await bookResponse.json()
  } else {
    return {
      props: {
        errorText: 'There was an error fetching your books. Status code: ' + bookResponse.status
      }
    }
  }

  const followingResponse = await fetch(domain + '/api/v1/follows', {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  let following: PublicUserInfo[] | null = null
  if (followingResponse.ok) {
    following = await followingResponse.json()
  } else {
    return {
      props: {
        errorText: 'There was an error fetching the users you\'re following. Status code: ' + followingResponse.status
      }
    }
  }

  const userLeaderboardResponse = await fetch(domain + '/api/v1/users/leaderboard?limit=10', {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  let userLeaderboard: PublicUserInfo[] | null = null
  if (userLeaderboardResponse.ok) {
    userLeaderboard = await userLeaderboardResponse.json()
  } else {
    return {
      props: {
        errorText: 'There was an error getting leaderboard data. Status code: ' + userLeaderboardResponse.status
      }
    }
  }

  return {
    props: {
      jwt,
      following,
      books,
      userLeaderboard
    }
  }
}
