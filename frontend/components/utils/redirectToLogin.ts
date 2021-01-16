import { ServerResponse } from 'http'

const redirectToLogin = (res: ServerResponse, redirect?: string) => {
  res.statusCode = 302
  if (redirect) {
    res.setHeader('location', `login?redirect=${encodeURIComponent(redirect)}`)
  } else {
    res.setHeader('location', '/login')
  }
  res.end()
}

export default redirectToLogin
