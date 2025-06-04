import React from 'react'
import { ChevronRight } from 'lucide-react'
function InvoiceList() {
  return (
    <div className='space-y-4 '>
      <div className='bg-slate-800 rounded-lg p-6 flex items-center justify-between hover:bg-slate-700 transition-all duration-200 cursor-pointer'>
        <div className='flex items-center space-x-6'>
          <span className='text-slate-400 '>Invoice ID</span>
          <span className='text-slate-400 '>Due Day</span>
          <span className='text-slate-400 '>John Deo</span>

        </div>
        {/* invoice body */}
        <div className='flex items-center space-x-6'>
          <span className='text-slate-300 text-2xl font-bold'>$350</span>
          <div>
            <span className='capitalize '>invoice status</span>
          </div>
          <ChevronRight size={20} className='text-violet-400' />
        </div>
      </div>
    </div>
  )
}

export default InvoiceList