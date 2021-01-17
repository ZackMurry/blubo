import { Typography } from '@material-ui/core'
import React from 'react'
import Logo from '../components/Logo'
import theme from '../components/utils/theme'

const LandingPage: React.FC = () => (
  <div style={{ minHeight: '100vh', width: '100%', backgroundColor: theme.palette.primary.main }}>
    <div>
      <div style={{ paddingLeft: 50, paddingTop: 25 }}>
        <Logo size='small' white />
      </div>
      <div style={{ padding: 150 }}>
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
      </div>
    </div>
  </div>
)

export default LandingPage
