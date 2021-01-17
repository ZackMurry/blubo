import { CircularProgress } from '@material-ui/core'
import { FC, useRef, useState } from 'react'
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
  onError: Function
}

const BookViewer: FC<Props> = ({
  base64, pageNumber, onLoadSuccess, onError
}) => {
  const [ width, setWidth ] = useState(612)
  const ref = useRef(null)

  const handleRenderSuccess = () => {
    setWidth(ref.current.getBoundingClientRect().width)
    console.log(ref.current.getBoundingClientRect().width)
  }

  return (
    <div ref={ref}>
      <Document
        file={base64}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onError}
        loading={<LoadingSpinner />}
      >
        <Page pageNumber={pageNumber} loading={<div />} onRenderSuccess={handleRenderSuccess} />
      </Document>
    </div>
  )
}

export default BookViewer
