import Link from 'next/link'
import { Card, CardActionArea, Typography } from '@material-ui/core'
import { FC } from 'react'
import theme from '../utils/theme'

interface Props {
  id: string
  title: string
  author: string
}

const BookPreview: FC<Props> = ({
  id, title, author
}) => (
  <Link href={`/books/${id}`}>
    <a href={`/books/${id}`}>
      <Card style={{ borderRadius: 10 }}>
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
            <div style={{ paddingTop: 5, backgroundColor: '#fff' }}>
              <Typography variant='h5' style={{ padding: 10, paddingBottom: 5, fontSize: 18 }}>
                {title}
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
                {author}
              </Typography>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </a>
  </Link>
)

export default BookPreview
