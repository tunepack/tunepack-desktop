const getOS = () => {
  const userAgent = window.navigator.userAgent

  if (userAgent.indexOf('Windows NT 10.0') !== -1) return 'win'
  if (userAgent.indexOf('Windows NT 6.2') !== -1) return 'win'
  if (userAgent.indexOf('Windows NT 6.1') !== -1) return 'win'
  if (userAgent.indexOf('Windows NT 6.0') !== -1) return 'win'
  if (userAgent.indexOf('Windows NT 5.1') !== -1) return 'win'
  if (userAgent.indexOf('Windows NT 5.0') !== -1) return 'win'
  if (userAgent.indexOf('Mac') !== -1) return 'mac'
  if (userAgent.indexOf('X11') !== -1) return 'unix'
  if (userAgent.indexOf('Linux') !== -1) return 'linux'
}

const getOSLabel = os => {
  if (os === 'win') {
    return 'Windows'
  } else if (os === 'mac') {
    return 'macOS'
  } else if (os === 'linux') {
    return 'Linux'
  }

  return false
}

export const os = getOS()
export const osLabel = getOSLabel(os)
