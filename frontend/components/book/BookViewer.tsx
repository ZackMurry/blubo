import { CircularProgress } from '@material-ui/core'
import { FC } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

const LoadingSpinner = () => (
  <div
    style={{
      width: 792,
      paddingLeft: 612,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <CircularProgress />
  </div>
)

interface Props {
  base64: string
  pageNumber: number
  onLoadSuccess: Function
}

const BookViewer: FC<Props> = ({ base64, pageNumber, onLoadSuccess }) => (
  <div>
    <Document
      file={base64}
      onLoadSuccess={onLoadSuccess}
      onLoadError={console.err}
      loading={<LoadingSpinner />}
    >
      <Page pageNumber={pageNumber} loading={<div />} />
    </Document>
  </div>
)

export default BookViewer
