import { ChangeEvent, FC, useState } from 'react'

const UploadBook: FC = () => {
  const [ file, setFile ] = useState(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }

  const handleFileUpload = async () => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/v1/books', {
      method: 'POST',
      body: formData
    })
    console.log(response)
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button type='submit' onClick={handleFileUpload}>
        Upload
      </button>
    </div>
  )

}

export default UploadBook
