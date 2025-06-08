import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
function InvoiceList() {
  const invoices = useSelector((state) => state.invoice.invoiceList)
  const formatDate=(date)=>{
    try{
      return format(parseISO(date), 'dd MMM yyyy')
    }
    catch(error){
      console.error("Error formatting date:", error);
    }
  }
  return (
    <div className='space-y-4 '>
      {invoices.map((invoice, index) => (
        <div className='bg-slate-800 rounded-lg p-6 flex items-center justify-between hover:bg-slate-700 transition-all duration-200 cursor-pointer' key={index}>
        <div className='flex items-center space-x-6'>
          <span className='text-slate-400 '>{invoice.id}</span>
          <span className='text-slate-400 '>Due {formatDate(invoice.dueDate)}</span>
          <span className='text-slate-400 '>{invoice.clientName || "name"} </span>

        </div>
        {/* invoice body */}
        <div className='flex items-center space-x-6'>
          <span className='text-slate-300 text-2xl font-bold'>${invoice.amount?.toFixed(2) || "0.00"}</span>
          <div>
            <span className='capitalize '>{invoice.status}</span>
          </div>
          <ChevronRight size={20} className='text-violet-400' />
        </div>
      </div>
      ))}
    </div>
  )
}

export default InvoiceList