import Link from 'next/link'
import { Card, CardActionArea, Typography } from '@material-ui/core'
import { FC, useMemo } from 'react'
import theme from '../utils/theme'

interface Props {
  id: string
  title: string
  author: string
}

const BookPreview: FC<Props> = ({
  id, title, author
}) => {
  const shortenedTitle = useMemo(() => {
    if (title.length < 40) {
      return title
    }
    return title.substring(0, 37) + '...'
  }, [ title ])
  const shortenedAuthor = useMemo(() => {
    if (author.length < 30) {
      return author
    }
    return author.substring(0, 27) + '...'
  }, [ author ])
  return (
    <Link href={`/books/${id}`}>
      <a href={`/books/${id}`}>
        <Card elevation={2} style={{ borderRadius: 10 }}>
          <CardActionArea>
            <div
              style={{
                height: 200,
                width: '100%',
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'flex-end'
              }}
            >
              <div
                style={{
                  paddingTop: 5,
                  backgroundColor: '#fff',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 95
                }}
              >
                <Typography variant='h5' style={{ padding: 10, paddingBottom: 5, fontSize: 18 }}>
                  {shortenedTitle}
                </Typography>
                <Typography
                  variant='h6'
                  style={{
                    padding: 10,
                    paddingTop: 0,
                    fontSize: 10,
                    fontWeight: 300,
                    textTransform: 'uppercase'
                  }}
                >
                  {shortenedAuthor || 'No author'}
                </Typography>
              </div>
            </div>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  )
}

export default BookPreview
