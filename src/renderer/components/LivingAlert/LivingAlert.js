import React, { useEffect } from 'react'

const LivingAlert = ({
  children,
  lifeTime = 5000,
  onDestroy,
  className
}) => {
  useEffect(() => {
    setTimeout(() => {
      onDestroy()
    }, lifeTime)
  }, [])

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default LivingAlert
