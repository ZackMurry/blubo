import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { FC } from 'react'

interface Props {
  text: string
  onClose?: () => void
  disableClose?: boolean
}

const ErrorAlert: FC<Props> = ({ text, onClose, disableClose = false }) => (
  <Snackbar autoHideDuration={disableClose ? undefined : 10000} open={!!text}>
    {
      disableClose
        ? (
          <MuiAlert action={null} severity='error' elevation={6} variant='filled'>
            {text}
          </MuiAlert>
        )
        : (
          <MuiAlert onClose={onClose} severity='error' elevation={6} variant='filled'>
            {text}
          </MuiAlert>
        )
    }
  </Snackbar>
)

export default ErrorAlert
