import { parse } from 'cookie'
import { GetServerSideProps, NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import ErrorAlert from '../components/alert/ErrorAlert'
import redirectToLogin from '../components/utils/redirectToLogin'

interface Props {
  jwt?: string
}

const UploadBook: NextPage<Props> = ({ jwt }) => {
  const [ file, setFile ] = useState(null)
  const [ errorText, setErrorText ] = useState('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }

  const handleFileUpload = async () => {
    if (!file) {
      setErrorText('You must select a file')
      return
    }
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/v1/books', {
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}` },
      body: formData
    })
    setErrorText('')
    console.log(response)
  }

  return (
    <>
      <div>
        <input type='file' onChange={handleFileChange} />
        <button type='submit' onClick={handleFileUpload}>
          Upload
        </button>
      </div>
      {
        errorText && <ErrorAlert text={errorText} onClose={() => setErrorText('')} />
      }
    </>
  )
}

export default UploadBook

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
  let jwt: string | null = null
  if (req.headers?.cookie) {
    jwt = parse(req.headers.cookie)?.jwt
  }
  if (!jwt) {
    redirectToLogin(res, '/upload')
    return {
      props: {}
    }
  }
  return {
    props: {
      jwt
    }
  }
}
