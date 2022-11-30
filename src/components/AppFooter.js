import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      
      <div className="ms-auto">
        <a href="https://flash-launch.com" target="_blank" rel="noopener noreferrer">
          Flash
        </a>
        <span className="ms-1">&copy; 2022 Flash Technologies.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
