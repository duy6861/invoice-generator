import { format, parseISO } from 'date-fns'
import React from 'react'
import { markAsPaid, deleteInvoice, toggleForm } from '../store/invoiceSlice'
import { useDispatch } from 'react-redux'
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from './InvoicePDF'
export default function InvoiceDetail({ invoice }) {
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'dd MMM yyyy')
    }
    catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date"; // Return original string if parsing fails
    }
  }
  const handleEditInvoice = () => {
    dispatch(toggleForm())
  }
  const dispatch = useDispatch()
  const handleMarkAsPaid = () => {
    dispatch(markAsPaid(invoice.id))
  }
  const handleDeleteInvoice = () => {
    dispatch(deleteInvoice(invoice.id))
  }
  return (
    <div className='bg-slate-800 rounded-lg p-6'>
      <div className='flex items-center justify-between mb-8 '>
        <div className='flex items-center space-x-4'>
          <span>Status</span>
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
        </div>
        <div className='flex space-x-4'>
          <div className='px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-200'>
            <PDFDownloadLink document={<InvoicePDF invoice={invoice} />} fileName={`invoice_${invoice.id}.pdf`}>
              Download PDF
            </PDFDownloadLink>
          </div>
          <button className='px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-200'
            onClick={handleEditInvoice}
          >
            Edit
          </button>
          <button className='px-6 py-3 rounded-full bg-red-700 hover:bg-red-600 transition-all duration-200'
            onClick={handleDeleteInvoice}
          >
            Delete
          </button>
          <button className='px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-600 transition-all duration-200'
            onClick={handleMarkAsPaid} disabled={invoice.status === 'paid' ? true : false}
          >
            Mark as Paid
          </button>
        </div>
      </div>
      <div className='bg-slate-900 rounded-lg p-8'>
        <div className='flex justify-between mb-8'>
          <div className=''>
            <h2 className='text-xl font-bold mb-2 '>#{invoice.id}</h2>
            <p className='text-slate-400'>Description: {invoice.projectDescription}</p>
          </div>
          <div className='text-right text-slate-400'>
            <p>{invoice.billFrom.streetAddress}</p>
            <p>{invoice.billFrom.city}</p>
            <p>{invoice.billFrom.postCode}</p>
            <p>{invoice.billFrom.country}</p>
          </div>
        </div>

        <div className=' grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <p className='text-slate-400 mb-2'>Invoice Date</p>
            <p className='font-bold'>{formatDate(invoice.invoiceDate)}</p>
            <p className='text-slate-400 mb-2'>Payment Due</p>
            <p className='font-bold'>{formatDate(invoice.dueDate)}</p>
          </div>
          <div>
            <p className=' text-slate-400 mb-2'>Bill To</p>
            <p className='font-bold mb-2'>{invoice.clientName}</p>
            <p className='text-slate-400'>{invoice.billTo.streetAddress}</p>
            <p className='text-slate-400'>{invoice.billTo.city}</p>
            <p className='text-slate-400'>{invoice.billTo.postCode}</p>
            <p className='text-slate-400'>{invoice.billTo.country}</p>
          </div>
          <div>
            <p className='text-slate-400 mb-2'>Sent to</p>
            <p className='font-bold'>{invoice.billTo.clientEmail}</p>
          </div>
        </div>
        <div className='bg-slate-800 rounded-lg overflow-hidden'>
          <div className='p-8'>
            <table className='w-full '>
              <thead>
                <tr className='text-slate-400'>
                  <th className=' text-left py-2 px-4'>Item Name</th>
                  <th className='py-2 px-4 text-center'>Quantity</th>
                  <th className='py-2 px-4 text-right'>Price</th>
                  <th className='py-2 px-4 text-right'>Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Example row, replace with dynamic data */}
                {
                  invoice.items.map((item, index) => (
                    <tr className='border-t border-slate-700 text-white' key={index}>
                      <td className='py-2 px-4'>{item.name}</td>
                      <td className='py-2 px-4 text-center'>{item.quantity}</td>
                      <td className='py-2 px-4 text-right'>{item.price.toFixed(2)}</td>
                      <td className='py-2 px-4 text-right'>{item.total.toFixed(2)}</td>
                    </tr>
                  ))
                }
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          <div>
            <div className='flex justify-between p-8 bg-slate-900 items-center'>
              <span className='text-white'>Amount Due</span>
              <span className='text-3xl font-bold'>${invoice.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}