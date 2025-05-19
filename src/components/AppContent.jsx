import React from 'react'
import Header from './Header'
function AppContent() {
  return (
    <div className='bg-slate-900 text-white min-h-screen'>
      <div className=' max-w-5xl mx-auto py-12 px-4'>
        <Header />
        <div>AppContent</div>
      </div>
    </div>
  )
}

export default AppContent