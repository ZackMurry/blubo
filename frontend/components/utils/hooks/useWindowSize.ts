import { useEffect, useState } from 'react'

// from https://usehooks.com/useWindowSize/
const useWindowSize = (initialWidth: number, initialHeight: number) => {
  const [ windowSize, setWindowSize ] = useState({
    width: initialWidth,
    height: initialHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [ ])

  return windowSize
}

export default useWindowSize
