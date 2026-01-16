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
    // Initial check
    const checkWidth = () => {
      toggle(window.innerWidth < breakpoint)
    }

    // Check on mount
    checkWidth()

    // Add event listener
    window.addEventListener('resize', checkWidth)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkWidth)
    }
  }, [breakpoint]) // Add dependency array!

  return { isMobile }
}

export default useMediaQuery
