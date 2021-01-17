import atob from 'atob'

// from https://react-pdf-viewer.dev/examples/preview-a-pdf-file-from-base-64/
const base64ToBlob = (data: string): Blob => {
  console.log('in base64ToBlob')
  const withoutPrefix = data.substr('data:application/pdf;base64,'.length)
  console.log(withoutPrefix.substring(0, 1000))
  const bytes = atob(withoutPrefix)
  let { length } = bytes
  const out = new Uint8Array(length)

  while (length--) {
    out[length] = bytes.charCodeAt(length)
  }
  return new Blob([out], { type: 'application/pdf' })
}

export default base64ToBlob
