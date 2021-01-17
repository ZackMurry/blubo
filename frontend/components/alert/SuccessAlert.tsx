import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { FC } from 'react'

interface Props {
  text: string
  onClose: () => void
}

const SuccessAlert: FC<Props> = ({ text, onClose }) => (
  <Snackbar open={Boolean(text)} autoHideDuration={5000} onClose={onClose}>
    <MuiAlert onClose={onClose} severity='success' elevation={6}>
      {text}
    </MuiAlert>
  </Snackbar>
)

export default SuccessAlert
