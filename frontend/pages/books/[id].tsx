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
  loadingErrorText?: string
  id?: string
  ownerId?: string
  title?: string
  author?: string
  base64?: string
  pageNumber?: number
}

const BookPage: NextPage<Props> = ({
  jwt, id, base64, pageNumber: startingPageNumber, loadingErrorText
}) => {
  const [ numPages, setNumPages ] = useState<number | null>(null)
  const [ pageNumber, setPageNumber ] = useState(startingPageNumber)
  const [ warningText, setWarningText ] = useState('')
  const [ errorText, setErrorText ] = useState('')
  const [ size, setSize ] = useState({ width: 612, height: 792 })

  const { width: windowWidth, height: windowHeight } = useWindowSize(1920, 1080)

  const handleLoadSuccess = e => {
    setNumPages(e.numPages)
  }

  const updatePageNumber = useCallback(throttle(async (newPage: number) => {
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

  const handleSizeChange = (width: number, height: number) => {
    if (size.width !== width || size.height !== height) {
      setSize({ width, height })
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
          backgroundColor: theme.palette.primary.main
        }}
      >
        <div
          style={{
            width: (windowWidth - size.width) / 2,
            backgroundColor: theme.palette.primary.main
          }}
          onClick={handlePreviousPage}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ height: (windowHeight - size.height) / 2 }}>
            <Link href='/home'>
              <a href='/home'>
                <Logo size='small' white />
              </a>
            </Link>
          </div>
          <div
            style={{
              minWidth: size.width,
              width: '30%',
              height: size.height,
              backgroundColor: '#fff'
            }}
          >
            {
              base64 && (
                <BookViewer
                  onLoadSuccess={handleLoadSuccess}
                  base64={base64}
                  pageNumber={pageNumber}
                  onError={e => setErrorText(`Error while loading document: ${e.message}`)}
                  onSizeChange={handleSizeChange}
                />
              )
            }
          </div>
          <div style={{ display: 'flex' }}>
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
        </div>
        <div
          style={{
            width: (windowWidth - size.width) / 2,
            backgroundColor: theme.palette.primary.main
          }}
          onClick={handleNextPage}
        />
      </div>
      {
        loadingErrorText && <ErrorAlert text={loadingErrorText} disableClose />
      }
      {
        warningText && <WarningAlert text={warningText} onClose={() => setWarningText('')} />
      }
      {
        errorText && <ErrorAlert text={errorText} disableClose />
      }
    </>
  )
}

export default BookPage

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, query }) => {
  const { id } = query
  if (!id) {
    res.statusCode = 404
    return {
      props: {}
    }
  }

  let jwt: string | null = null
  if (req.headers?.cookie) {
    jwt = parse(req.headers.cookie)?.jwt
  }
  if (!jwt) {
    redirectToLogin(res, `/books/${id}`)
    return {
      props: {}
    }
  }

  const domain = process.env.NODE_ENV !== 'production' ? 'http://localhost' : 'https://blubo.zackmurry.com'

  const infoResponse = await fetch(`${domain}/api/v1/books/${id}`, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  let bookDetails: BookEntity | null = null
  if (infoResponse.ok) {
    bookDetails = (await infoResponse.json()) as BookEntity
  } else {
    let loadingErrorText: string | null
    if (infoResponse.status === 403 || infoResponse.status === 401) {
      loadingErrorText = 'You must be logged in in order to see a book'
    } else if (infoResponse.status === 400) {
      loadingErrorText = 'This is not a valid book id'
    } else if (infoResponse.status === 500) {
      loadingErrorText = 'A server error occured during your request. Please try again'
    } else if (infoResponse.status === 404) {
      loadingErrorText = 'No book found with this ID'
    } else {
      loadingErrorText = `Unknown error. Response status: ${infoResponse.status}`
    }

    return {
      props: {
        loadingErrorText
      }
    }
  }

  let content: string | null = null
  const contentResponse = await fetch(domain + `/api/v1/books/${id}/raw`, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  if (contentResponse.ok) {
    content = await contentResponse.text()
  } else {
    let loadingErrorText: string | null = null
    if (contentResponse.status === 401 || contentResponse.status === 403) {
      loadingErrorText = 'You don\'t have access to this book'
    } else if (contentResponse.status === 400) {
      loadingErrorText = 'This is an invalid book id'
    } else if (contentResponse.status === 404) {
      loadingErrorText = 'There was no book with this ID found'
    } else if (contentResponse.status === 500) {
      loadingErrorText = 'A server error occured during your request. Please try again'
    } else {
      loadingErrorText = 'There was an unknown error. Status code: ' + contentResponse.status
    }
    return {
      props: {
        errorText: loadingErrorText
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
