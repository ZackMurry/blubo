import { parse } from 'cookie'
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Typography } from '@material-ui/core'
import throttle from 'lodash.throttle'
import redirectToLogin from '../../components/utils/redirectToLogin'
import useWindowSize from '../../components/utils/hooks/useWindowSize'
import theme from '../../components/utils/theme'
import Logo from '../../components/Logo'
import BookEntity from '../../components/utils/types/BookEntity'
import ErrorAlert from '../../components/alert/ErrorAlert'
import WarningAlert from '../../components/alert/WarningAlert'

const BookViewer = dynamic(() => import('../../components/book/BookViewer'))

interface Props {
  jwt?: string
  errorText?: string
  id?: string
  ownerId?: string
  title?: string
  author?: string
  base64?: string
  pageNumber?: number
}

const BookPage: NextPage<Props> = ({
  jwt, id, base64, pageNumber: startingPageNumber, errorText
}) => {
  const [ numPages, setNumPages ] = useState<number | null>(null)
  const [ pageNumber, setPageNumber ] = useState(startingPageNumber)
  const [ warningText, setWarningText ] = useState('')

  const { width, height } = useWindowSize(1920, 1080)

  const handleLoadSuccess = e => {
    setNumPages(e.numPages)
  }

  const updatePageNumber = useCallback(throttle(async (newPage: number) => {
    console.log('throttle')
    const response = await fetch(`/api/v1/books/${id}/page`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: newPage
      })
    })
    if (!response.ok) {
      setWarningText('There was a problem updating your page number')
    }
  }, 2500, { leading: true }), [])

  const handleNextPage = async () => {
    if (pageNumber < numPages) {
      updatePageNumber(pageNumber + 1)
      setPageNumber(pageNumber + 1)
    }
  }

  const handlePreviousPage = async () => {
    if (pageNumber > 1) {
      updatePageNumber(pageNumber - 1)
      setPageNumber(pageNumber - 1)
    }
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: theme.palette.primary.main,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: (width - 612) / 2,
            backgroundColor: theme.palette.primary.main
          }}
          onClick={handlePreviousPage}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ height: (height - 792) / 2 }}>
            <Link href='/home'>
              <a href='/home'>
                <Logo size='small' white />
              </a>
            </Link>
          </div>
          <div
            style={{
              minWidth: 612,
              width: '30%',
              height: 792,
              backgroundColor: '#fff'
            }}
          >
            {
              base64 && (
                <BookViewer
                  onLoadSuccess={handleLoadSuccess}
                  base64={base64}
                  pageNumber={pageNumber}
                />
              )
            }
          </div>
          {
            numPages && (
              <Typography
                variant='h3'
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 10,
                  userSelect: 'none',
                  color: '#fff'
                }}
              >
                {`Page ${pageNumber} of ${numPages}`}
              </Typography>
            )
          }
        </div>
        <div
          style={{
            width: (width - 612) / 2,
            backgroundColor: theme.palette.primary.main
          }}
          onClick={handleNextPage}
        />
      </div>
      {
        errorText && <ErrorAlert text={errorText} disableClose />
      }
      {
        warningText && <WarningAlert text={warningText} onClose={() => setWarningText('')} />
      }
    </>
  )
}

export default BookPage

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, query }) => {
  let jwt: string | null = null
  if (req.headers?.cookie) {
    jwt = parse(req.headers.cookie)?.jwt
  }
  if (!jwt) {
    redirectToLogin(res, '/upload')
    return {
      props: {}
    }
  }
  const { id } = query
  if (!id) {
    res.statusCode = 404
    return {
      props: {}
    }
  }

  const dev = process.env.NODE_ENV !== 'production'
  const domain = dev ? 'http://localhost' : 'https://blubo.zackmurry.com'

  const infoResponse = await fetch(`${domain}/api/v1/books/${id}`, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  let bookDetails: BookEntity | null = null
  if (infoResponse.ok) {
    bookDetails = (await infoResponse.json()) as BookEntity
  } else {
    let errorText: string | null
    if (infoResponse.status === 403 || infoResponse.status === 401) {
      errorText = 'You must be logged in in order to see a book'
    } else if (infoResponse.status === 400) {
      errorText = 'This is not a valid book id'
    } else if (infoResponse.status === 500) {
      errorText = 'A server error occured during your request. Please try again'
    } else if (infoResponse.status === 404) {
      errorText = 'No book found with this ID'
    } else {
      errorText = `Unknown error. Response status: ${infoResponse.status}`
    }

    return {
      props: {
        errorText
      }
    }
  }

  let content: string | null = null
  const contentResponse = await fetch((dev ? 'http://localhost' : 'https://blubo.zackmurry.com') + `/api/v1/books/${id}/raw`, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  if (contentResponse.ok) {
    content = await contentResponse.text()
  } else {
    let errorText: string | null = null
    if (contentResponse.status === 401 || contentResponse.status === 403) {
      errorText = 'You don\'t have access to this book'
    } else if (contentResponse.status === 400) {
      errorText = 'This is an invalid book id'
    } else if (contentResponse.status === 404) {
      errorText = 'There was no book with this ID found'
    } else if (contentResponse.status === 500) {
      errorText = 'A server error occured during your request. Please try again'
    } else {
      errorText = 'There was an unknown error. Status code: ' + contentResponse.status
    }
    return {
      props: {
        errorText
      }
    }
  }

  return {
    props: {
      ...bookDetails,
      base64: content,
      jwt
    }
  }
}
