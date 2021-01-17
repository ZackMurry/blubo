import { Grid, Paper, Typography } from '@material-ui/core'
import { FC } from 'react'
import PublicUserInfo from '../utils/types/PublicUserInfo'
import LeaderboardRow from './LeaderboardRow'

interface Props {
  following: PublicUserInfo[]
  leaderboard: PublicUserInfo[]
}

const PageLeaderboard: FC<Props> = ({ following, leaderboard }) => (
  <Paper
    style={{
      width: '100%',
      padding: 50
    }}
  >
    <Typography
      variant='h2'
      style={{
        fontSize: 36,
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 10
      }}
    >
      Leaderboard
    </Typography>
    <div style={{ margin: '30px auto', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '50%' }}>
        <Typography variant='h3' style={{ fontSize: 24, textAlign: 'center', marginBottom: 25 }}>
          Following
        </Typography>
        <Grid container spacing={3}>
          {
            following.length !== 0 && (
              <>
                <Grid item xs={6}>
                  <Typography style={{ fontWeight: 500 }}>
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography style={{ fontWeight: 500 }}>
                    Pages read
                  </Typography>
                </Grid>
              </>
            )
          }
          {
            following.map(userInfo => (
              <LeaderboardRow {...userInfo} />
            ))
          }
        </Grid>
        {
          following.length === 0 && (
            <Typography
              variant='h5'
              style={{
                fontSize: 18,
                textAlign: 'center',
                marginTop: 25,
                color: '#6e84a3',
                padding: '0 10px'
              }}
            >
              You aren't following any users yet!
            </Typography>
          )
        }
      </div>
      <div style={{ width: '50%' }}>
        <Typography variant='h3' style={{ fontSize: 24, textAlign: 'center', marginBottom: 25 }}>
          All users
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography style={{ fontWeight: 500 }}>
              Name
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ fontWeight: 500 }}>
              Pages read
            </Typography>
          </Grid>
          {
            leaderboard.map(userInfo => (
              <LeaderboardRow {...userInfo} />
            ))
          }
        </Grid>
      </div>
    </div>
  </Paper>
)

export default PageLeaderboard
