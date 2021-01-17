import {
  Button,
  Card, CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import theme from '../utils/theme'

interface Props {
  jwt: string
}

const ImportBook: FC<Props> = ({ jwt }) => {
  const [ popupState, setPopupState ] = useState(0)
  const [ file, setFile ] = useState(null)
  const [ errorText, setErrorText ] = useState('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }

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
    setErrorText('')
    console.log(response)
    setPopupState(2)
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
      <Dialog
        open={popupState === 1}
        onClose={() => setPopupState(0)}
      >
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
    </>
  )
}

export default ImportBook
