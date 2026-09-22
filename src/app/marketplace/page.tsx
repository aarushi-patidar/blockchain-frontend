import React from 'react'
import MarketplaceContent from '@/components/marketplace/MarketplaceContent'

const page = () => {
  return (
    <div className='relative w-full h-screen'>
      <img src="dashboardBg.svg" className='fixed scale-x-130 -z-10 w-full h-full' alt="" />
      <div className='relative z-10 p-8'>
        <MarketplaceContent />
      </div>
    </div>
  )
}

export default page