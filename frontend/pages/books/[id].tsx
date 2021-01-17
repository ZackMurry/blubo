import { parse } from 'cookie'
import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import redirectToLogin from '../../components/utils/redirectToLogin'
import useWindowSize from '../../components/utils/hooks/useWindowSize'
import theme from '../../components/utils/theme'
import { Typography } from '@material-ui/core'

const BookViewer = dynamic(() => import('../../components/book/BookViewer'))

interface Props {
  jwt?: string
  errorText?: string
  id?: string
  ownerId?: string
  title?: string
  author?: string
  file?: string
}

const BookPage: NextPage<Props> = ({ jwt, id, file }) => {
  const [ content, setContent ] = useState<string | null>(null)
  const [ numPages, setNumPages ] = useState<number | null>(null)
  const [ pageNumber, setPageNumber ] = useState(1)

  const { width, height } = useWindowSize(1920, 1080)

  const handleLoadSuccess = e => {
    setNumPages(e.numPages)
  }

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  return (
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
      <div>
        <div
          style={{
            minWidth: 612,
            width: '30%',
            height: 792,
            marginTop: (height - 792) / 2,
            backgroundColor: '#fff'
          }}
        >
          <BookViewer
            onLoadSuccess={handleLoadSuccess}
            base64={file}
            pageNumber={pageNumber}
          />
        </div>
        {
          numPages && (
            <Typography
              variant='h3'
              style={{
                fontSize: 18,
                textAlign: 'center',
                marginTop: 10,
                userSelect: 'none'
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
    if (infoResponse.status === 403 || infoResponse.status === 401) {
      return {
        props: {
          errorText: 'You must be logged in in order to see a book'
        }
      }
    }
    if (infoResponse.status === 400) {
      return {
        props: {
          errorText: 'This is not a valid book id'
        }
      }
    }
    if (infoResponse.status === 500) {
      return {
        props: {
          errorText: 'A server error occured during your request. Please try again'
        }
      }
    }

    return {
      props: {
        errorText: `Unknown error. Response status ${infoResponse.status}`
      }
    }
  }

  let content: string | null = null
  const contentResponse = await fetch((dev ? 'http://localhost' : 'https://blubo.zackmurry.com') + `/api/v1/books/${id}/raw`, {
    headers: { Authorization: `Bearer ${jwt}` }
  })
  if (contentResponse.ok) {
    content = await contentResponse.text()
    console.log(content.substring(0, 1000))
  }
  return {
    props: {
      ...bookDetails,
      file: content//.substr('data:application/pdf;base64,'.length)
    }
  }
}
