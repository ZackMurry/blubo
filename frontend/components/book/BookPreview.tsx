import { Card, CardActionArea, CardContent, Paper, Typography } from '@material-ui/core'
import { FC } from 'react'
import theme from '../utils/theme'

interface Props {
  id: string
  ownerId: string
  title: string
  author: string
}

const BookPreview: FC<Props> = ({ id, ownerId, title, author }) => (
  <Card style={{ borderRadius: 10 }}>
    <CardActionArea>
      <div
        style={{
          height: 125,
          width: '100%',
          backgroundColor: theme.palette.secondary.main,
          borderRadius: '10px 10px 0 0'
        }}
      />
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
    </CardActionArea>
  </Card>
)

export default BookPreview
