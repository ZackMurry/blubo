import { Grid } from '@material-ui/core'
import { FC } from 'react'
import PublicUserInfo from '../utils/types/PublicUserInfo'

const LeaderboardRow: FC<PublicUserInfo> = ({ firstName, lastName, pagesRead }) => (
  <>
    <Grid item xs={6}>
      {`${firstName} ${lastName}`}
    </Grid>
    <Grid item xs={6}>
      {`${pagesRead} pages`}
    </Grid>
  </>
)

export default LeaderboardRow
