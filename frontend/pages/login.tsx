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

const LoginPage: FC = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ errorText, setErrorText ] = useState('')
  const [ showPassword, setShowPassword ] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      setErrorText('Please enter your email')
      return
    }
    if (!password) {
      setErrorText('Please enter your password')
      return
    }

    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })
    if (response.ok) {
      const { jwt } = (await response.json())
      Cookie.set('jwt', jwt)
      router.push('/home')
    } else if (response.status === 404 || response.status === 401 || response.status === 403 || response.status === 400) {
      setErrorText('Invalid email and/or password')
    } else if (response.status === 500) {
      setErrorText('A server error occurred while logging you in. Please try again later')
    } else {
      setErrorText(`There was an unknown error. HTTP status: ${response.status}`)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main
      }}
    >
      <Paper elevation={5} style={{ padding: '50px 75px', borderRadius: 15 }}>
        <Typography variant='h3' style={{ marginBottom: 25, textAlign: 'center' }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            variant='outlined'
            label='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ marginBottom: '3vh' }}
          />
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
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              color='secondary'
              type='submit'
              variant='contained'
              style={{ width: '50%', marginTop: 25 }}
            >
              Login
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

export default LoginPage
