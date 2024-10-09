import { useEffect, useState } from 'react'

export interface WindowSize {
  windowWidth: number | undefined
  windowHeight: number | undefined
}

type ReturnProps = WindowSize & { isMobile: boolean }

export const useWindowSize = (): ReturnProps => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: undefined,
    windowHeight: undefined
  })
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const windowResizeEvent = () =>
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      })

    window.addEventListener('resize', windowResizeEvent)
    windowResizeEvent()

    return () => window.removeEventListener('resize', windowResizeEvent)
  }, [])

  const windowWidth = windowSize.windowWidth
  useEffect(() => {
    if (!windowWidth) return
    setIsMobile(windowWidth < 1024)
  }, [windowWidth])

  return { ...windowSize, isMobile }
}
