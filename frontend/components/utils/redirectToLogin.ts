import { ServerResponse } from 'http'

const redirectToLogin = (res: ServerResponse, redirect?: string) => {
  res.statusCode = 302
  if (redirect) {
    res.writeHead(302, { Location: `/login?redirect=${encodeURIComponent(redirect)}` })
  } else {
    res.writeHead(302, { Location: '/login' })
  }
  res.end()
}

export default redirectToLogin
