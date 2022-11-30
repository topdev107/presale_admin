import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      
      <div className="ms-auto">
        <a href="https://134.209.22.166" target="_blank" rel="noopener noreferrer">
          BINGO
        </a>
        <span className="ms-1">&copy; 2021 creativeLabs.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
