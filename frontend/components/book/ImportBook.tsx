import {
  Button,
  Card, CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useState } from 'react'
import ErrorAlert from '../alert/ErrorAlert'
import theme from '../utils/theme'

interface Props {
  jwt: string
}

const ImportBook: FC<Props> = ({ jwt }) => {
  const [ popupState, setPopupState ] = useState(0)
  const [ file, setFile ] = useState(null)
  const [ errorText, setErrorText ] = useState('')
  const [ bookId, setBookId ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')

  const router = useRouter()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }

  // todo prompt for title and author
  const handleFileSubmit = async () => {
    if (!file) {
      setErrorText('You must select a file')
      return
    }
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/v1/books', {
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}` },
      body: formData
    })
    if (response.ok) {
      setErrorText('')
      setPopupState(2)
      const { id } = await response.json()
      setBookId(id)
      return
    }
    if (response.status === 400) {
      setErrorText('Unable to upload file. Make sure that it is a .pdf file')
    } else if (response.status === 401 || response.status === 403) {
      setErrorText('You must be logged in in order to upload a file')
    } else if (response.status === 500) {
      setErrorText('A server error occured during your request. Please try again')
    } else {
      setErrorText(`An unknown error occured during your request. Status code: ${response.status}`)
    }
  }

  const handleDetailsClose = () => {
    setPopupState(0)
    setAuthor('')
    setTitle('')
  }

  const handleSetDetails = async () => {
    console.log(bookId)
    const response = await fetch(`/api/v1/books/${bookId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author,
        title
      })
    })
    if (response.ok) {
      router.reload()
      return
    }
    if (response.status === 500) {
      setErrorText('A server error occured while setting the book\'s details. Please refresh')
    } else {
      setErrorText(`An unknown error occured while updating the book. Response status: ${response.status}`)
    }
  }

  return (
    <>
      <Card style={{ borderRadius: 10 }} onClick={() => setPopupState(1)}>
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
            <div style={{ width: '100%', padding: 5, backgroundColor: '#fff' }}>
              <Typography variant='h5' style={{ padding: 10, paddingBottom: 5, fontSize: 18 }}>
                Import book
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
                Import a PDF
              </Typography>
            </div>
          </div>
        </CardActionArea>
      </Card>
      <Dialog open={popupState === 1} onClose={() => setPopupState(0)}>
        <DialogTitle>
          Import book
        </DialogTitle>
        <DialogContent>
          <input type='file' onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopupState(0)}>
            Close
          </Button>
          <Button onClick={handleFileSubmit} variant='contained' color='secondary'>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={popupState === 2} onClose={handleDetailsClose}>
        <DialogTitle>
          Set book details
        </DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 25px' }}>
            <TextField
              value={title}
              label='Title'
              variant='outlined'
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              value={author}
              label='Author'
              variant='outlined'
              onChange={e => setAuthor(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose}>
            Close
          </Button>
          <Button onClick={handleSetDetails} variant='contained' color='secondary'>
            Finish
          </Button>
        </DialogActions>
      </Dialog>
      {
        errorText && <ErrorAlert text={errorText} onClose={() => setErrorText('')} />
      }
    </>
  )
}

export default ImportBook
