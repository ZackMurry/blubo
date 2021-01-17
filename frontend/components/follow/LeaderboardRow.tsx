import { Grid } from '@material-ui/core'
import { FC } from 'react'
import PublicUserInfo from '../utils/types/PublicUserInfo'

const LeaderboardRow: FC<PublicUserInfo> = ({ firstName, lastName, pagesReadInWeek }) => (
  <>
    <Grid item xs={6}>
      {`${firstName} ${lastName}`}
    </Grid>
    <Grid item xs={6}>
      {`${pagesReadInWeek} pages`}
    </Grid>
  </>
)

export default LeaderboardRow
