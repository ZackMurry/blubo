import {
  Button, Paper, TextField, Typography
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { FC, FormEvent, useState } from 'react'
import ErrorAlert from '../alert/ErrorAlert'
import SuccessAlert from '../alert/SuccessAlert'

interface Props {
  jwt: string
}

const FollowSection: FC<Props> = ({ jwt }) => {
  const [ followEmail, setFollowEmail ] = useState('')
  const [ errorText, setErrorText ] = useState('')
  const [ successText, setSuccessText ] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!followEmail) {
      setErrorText('You have to enter an email to follow')
    }
    const response = await fetch('/api/v1/follows', {
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: followEmail
      })
    })
    if (response.ok) {
      setErrorText('')
      setSuccessText(`Successfully followed ${followEmail}`)
      setFollowEmail('')
      setTimeout(router.reload, 2500)
    } else if (response.status === 401 || response.status === 403) {
      setErrorText('You must be logged in in order to follow users')
    } else if (response.status === 404) {
      setErrorText('User not found')
    } else if (response.status === 500) {
      setErrorText('A server error occured during your request. Please try again')
    } else {
      setErrorText('An unknown error occured during your request. Status code: ' + response.status)
    }
  }

  return (
    <>
      <Paper style={{ width: '100%', padding: '25px 0' }}>
        <Typography variant='h3' style={{ fontSize: 36, textAlign: 'center', paddingTop: 25 }}>
          Follow Users
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '15px 25%'
          }}
        >
          <TextField
            value={followEmail}
            label='Email'
            onChange={e => setFollowEmail(e.target.value)}
            variant='outlined'
            style={{ marginBottom: 25, minWidth: 150 }}
          />
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            style={{ width: '50%', minWidth: 100 }}
          >
            Follow
          </Button>
        </form>
      </Paper>
      {
        errorText && <ErrorAlert text={errorText} onClose={() => setErrorText('')} />
      }
      {
        successText && <SuccessAlert text={successText} onClose={() => setSuccessText('')} />
      }
    </>
  )
}

export default FollowSection
