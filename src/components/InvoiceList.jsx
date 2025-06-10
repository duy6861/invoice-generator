import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { setSelectedInvoice } from '../store/invoiceSlice'
function InvoiceList() {
  const dispatch = useDispatch()
  const invoices = useSelector((state) => state.invoice.invoiceList)
  const filter = useSelector((state) => state.invoice.filter)
  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === 'all') return true;
    return invoice.status === filter;
  })
  if (filteredInvoices.length === 0) {
    return (
      <div className='text-center py-2'>
        <p className='text-xl text-slate-400'>No invoices found.</p>
      </div>
    )
  }
  const handleInvoiceClick = (invoice) => {
    dispatch(setSelectedInvoice(invoice))
  }
  const formatDate = (date) => {
    try {
      return format(parseISO(date), 'dd MMM yyyy')
    }
    catch (error) {
      console.error("Error formatting date:", error);
    }
  }
  return (
    <div className='space-y-4 '>
      {filteredInvoices.map((invoice, index) => (
        <div className='bg-slate-800 rounded-lg p-6 flex items-center justify-between hover:bg-slate-700 transition-all duration-200 cursor-pointer'
          key={index}
          onClick={() => handleInvoiceClick(invoice)}
        >
          <div className='flex items-center space-x-6'>
            <span className='text-slate-400 '>{invoice.id}</span>
            <span className='text-slate-400 '>Due {formatDate(invoice.dueDate)}</span>
            <span className='text-slate-400 '>{invoice.clientName || "name"} </span>

          </div>
          {/* invoice body */}
          <div className='flex items-center space-x-6'>
            <span className='text-slate-300 text-2xl font-bold'>${invoice.amount?.toFixed(2) || "0.00"}</span>
            <div className={`px-4 space-x-2 py-2 rounded-lg flex items-center ${invoice.status === 'paid'
              ? 'bg-green-900/20 text-green-50' : invoice.status === 'pending'
                ? 'bg-yellow-500/20 text-white' : 'bg-gray-500/20 text-white'}`
            }>
              <div
                className={`w-2 h-2 rounded-full ${invoice.status === 'paid'
                  ? 'bg-green-500' : invoice.status === 'pending'
                    ? 'bg-yellow-500' : 'bg-gray-500'}`}
              ></div>
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