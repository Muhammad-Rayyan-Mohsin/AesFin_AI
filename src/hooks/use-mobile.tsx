import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
  height: number
  touchCapable: boolean
  reducedMotionPreference: boolean
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useDeviceInfo(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = React.useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1024,
        height: 768,
        touchCapable: false,
        reducedMotionPreference: false
      }
    }

    const width = window.innerWidth
    const height = window.innerHeight
    const isMobile = width < MOBILE_BREAKPOINT
    const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT
    const isDesktop = width >= TABLET_BREAKPOINT
    const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    return {
      isMobile,
      isTablet,
      isDesktop,
      width,
      height,
      touchCapable,
      reducedMotionPreference
    }
  })

  React.useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < MOBILE_BREAKPOINT
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT
      const isDesktop = width >= TABLET_BREAKPOINT
      const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        width,
        height,
        touchCapable,
        reducedMotionPreference
      })
    }

    // Listen for resize events
    window.addEventListener('resize', updateDeviceInfo, { passive: true })
    
    // Listen for orientation changes on mobile
    window.addEventListener('orientationchange', updateDeviceInfo, { passive: true })
    
    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', updateDeviceInfo)

    // Initial check
    updateDeviceInfo()

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
      mediaQuery.removeEventListener('change', updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}
