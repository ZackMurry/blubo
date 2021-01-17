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
  onSizeChange: (width: number, height: number) => void
}

const BookViewer: FC<Props> = ({
  base64, pageNumber, onLoadSuccess, onError, onSizeChange
}) => {
  const ref = useRef(null)

  const handleRenderSuccess = () => {
    const annotations = document.getElementsByClassName('react-pdf__Page__annotations annotationLayer')[0]
    while (annotations?.firstChild) {
      annotations.removeChild(annotations.firstChild)
    }

    const textContent = document.getElementsByClassName('react-pdf__Page__textContent')[0]
    while (textContent?.firstChild) {
      textContent.removeChild(textContent.firstChild)
    }

    const { width, height } = ref.current.getBoundingClientRect()
    onSizeChange(width, height)
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
