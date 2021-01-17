import { Button, Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'
import Logo from '../components/Logo'
import theme from '../components/utils/theme'
import useWindowSize from '../components/utils/hooks/useWindowSize'

const LandingPage: React.FC = () => {
  const { width } = useWindowSize(1920, 1080)

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: theme.palette.primary.main }}>
      <div>
        <div
          style={
            width < 1100
              ? {
                width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 25
              }
              : { paddingLeft: 50, paddingTop: 25 }
          }
        >
          <Logo size='small' white />
        </div>
        <div style={{ padding: '10%' }}>
          <Typography
            variant='h1'
            style={{
              color: '#fff',
              fontWeight: 600,
              fontSize: 64,
              textAlign: 'center'
            }}
          >
            Compete against your friends
          </Typography>
          <Typography
            variant='h3'
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 32,
              paddingTop: 10
            }}
          >
            Rise to the top of the reading leaderboard!
          </Typography>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '25px 0'
            }}
          >
            <Button
              variant='contained'
              href='/signup'
              style={{
                color: theme.palette.secondary.main,
                margin: '10px auto',
                width: '7.5%',
                minWidth: 100
              }}
            >
              Sign up!
            </Button>
            <Typography style={{ color: '#fff' }}>
              Or
              {' '}
              <Link href='/login'>
                <a href='/login' style={{ textDecoration: 'underline' }}>
                  log in
                </a>
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
