import { useEffect, useState } from 'react'

const useMediaQuery = (breakpoint: number) => {
  const [isMobile, toggle] = useState(false)
  const checkWidth = () => {
    if (window.innerWidth < breakpoint) {
      toggle(true)
    } else {
      toggle(false)
    }
  }

  useEffect(() => {
    const checkWidth = () => {
      toggle(window.innerWidth < breakpoint)
    }

    checkWidth()

    window.addEventListener('resize', checkWidth)

    return () => {
      window.removeEventListener('resize', checkWidth)
    }
  }, [breakpoint])

  return { isMobile }
}

export default useMediaQuery
