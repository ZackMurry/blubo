import { Grid, Paper, Typography } from '@material-ui/core'
import { FC } from 'react'
import PublicUserInfo from '../utils/types/PublicUserInfo'
import LeaderboardRow from './LeaderboardRow'

interface Props {
  following: PublicUserInfo[]
  leaderboard: PublicUserInfo[]
}

// todo toggle between pages read in week and pages read total
const PageLeaderboard: FC<Props> = ({ following, leaderboard }) => (
  <Paper
    style={{
      width: '100%',
      padding: '5%'
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
      Weekly Leaderboard
    </Typography>
    <Grid container spacing={3} style={{ margin: '30px auto' }}>
      <Grid item xs={12} lg={6}>
        <Typography variant='h3' style={{ fontSize: 24, textAlign: 'center', marginBottom: 25 }}>
          Following
        </Typography>
        <Grid container spacing={3}>
          {
            following?.length !== 0 && (
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
            Boolean(following?.length) && following.map(userInfo => (
              <LeaderboardRow key={userInfo.id + 'follow'} {...userInfo} />
            ))
          }
        </Grid>
        {
          following?.length === 0 && (
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
      </Grid>
      <Grid item xs={12} lg={6}>
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
            leaderboard?.length && leaderboard.map(userInfo => (
              <LeaderboardRow key={userInfo.id + 'board'} {...userInfo} />
            ))
          }
        </Grid>
      </Grid>
    </Grid>
  </Paper>
)

export default PageLeaderboard
