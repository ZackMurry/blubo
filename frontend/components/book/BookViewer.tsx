import { FC } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

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
      loading={<span>LOADING...</span>}
    >
      <Page pageNumber={pageNumber} loading={<div />} />
    </Document>
  </div>
)

export default BookViewer
