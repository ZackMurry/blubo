import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { useRouter } from 'next/router'
import {
  Button, IconButton, InputAdornment, Paper, TextField, Typography
} from '@material-ui/core'
import Cookie from 'js-cookie'
import { FC, FormEvent, useState } from 'react'
import ErrorAlert from '../components/alert/ErrorAlert'
import theme from '../components/utils/theme'
import ToggleIcon from '../components/utils/ToggleIcon'

const SignUpPage: FC = () => {
  const [ email, setEmail ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ showPassword, setShowPassword ] = useState(false)
  const [ errorText, setErrorText ] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.length > 320) {
      setErrorText('Your email is too long!')
      return
    }
    if (firstName.length > 64) {
      setErrorText('Your first name is too long for our system. Please try something shorter')
      return
    }
    if (lastName.length > 64) {
      setErrorText('Your last name is too long for our system. Please try something shorter')
      return
    }
    if (password.length < 8) {
      setErrorText('Your password must be at least 8 characters')
      return
    }
    if (password.length > 55) {
      setErrorText('Your password is too long!')
      return
    }

    const response = await fetch('/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        password
      })
    })

    if (response.ok) {
      setErrorText('')
      const { jwt } = await response.json()
      Cookie.set('jwt', jwt)
      router.push('/home')
    } else if (response.status === 400) {
      setErrorText('Your information is invalid')
    } else if (response.status === 406) {
      setErrorText('This email is already in use for an account')
    } else if (response.status === 500) {
      setErrorText('A server error occured during your request. Please try again')
    } else {
      setErrorText(`An unknown error occured. Response status: ${response.status}`)
    }
  }

  const handleInvalid = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorText('Please enter a valid email address')
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main
      }}
    >
      <Paper elevation={5} style={{ padding: '50px 75px', borderRadius: 15 }}>
        <Typography variant='h3' style={{ marginBottom: 25, textAlign: 'center' }}>
          Sign up
        </Typography>
        <form
          onSubmit={handleSubmit}
          onInvalid={handleInvalid}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            type='email'
            variant='outlined'
            label='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ marginBottom: '3vh' }}
            autoComplete='email'
          />
          <div style={{ marginBottom: '3vh', display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              variant='outlined'
              label='First'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{ width: 125, marginRight: '0.5vw' }}
              autoComplete='given-name'
            />
            <TextField
              variant='outlined'
              label='Last'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{ width: 125, marginLeft: '0.5vw' }}
              autoComplete='family-name'
            />
          </div>
          <TextField
            variant='outlined'
            label='Password'
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              style: {
                paddingRight: '25%'
              },
              endAdornment: (
                <InputAdornment
                  position='end'
                  style={{ marginRight: '-12%', marginTop: '-14%' }}
                >
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ padding: 0 }}
                  >
                    <ToggleIcon
                      on={showPassword}
                      timeout={250}
                      onIcon={<VisibilityIcon />}
                      offIcon={<VisibilityOffIcon />}
                    />
                  </IconButton>
                </InputAdornment>
              )
            }}
            autoComplete='password'
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              color='secondary'
              type='submit'
              variant='contained'
              style={{ width: '50%', marginTop: 25 }}
            >
              Sign up
            </Button>
          </div>
        </form>
      </Paper>
      {
        errorText && <ErrorAlert disableClose text={errorText} />
      }
    </div>
  )
}

export default SignUpPage
