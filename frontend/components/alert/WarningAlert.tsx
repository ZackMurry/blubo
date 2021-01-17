import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { FC } from 'react'

interface Props {
  text: string
  onClose: () => void
  timeout?: number
}

const SuccessAlert: FC<Props> = ({ text, onClose, timeout = 5000 }) => (
  <Snackbar open={!!text} autoHideDuration={timeout} onClose={onClose}>
    <MuiAlert onClose={onClose} severity='warning' elevation={6} variant='filled'>
      {text}
    </MuiAlert>
  </Snackbar>
)

export default SuccessAlert
