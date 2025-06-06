import React from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toggleForm } from '../store/invoiceSlice' // Correctly importing toggleForm
import { format, addDays } from 'date-fns'
function InvoiceForm() {
  const dispatch = useDispatch()
  const [formData, setFormData] = React.useState(() => {
    return {
      id: `INV${Math.floor(Math.random() * 10000)}`,
      status: 'pending',
      billFrom: {
        streetAddress: '',
        city: '',
        postCode: '',
        country: ''
      },
      billTo: {
        clientEmail: '',
        streetAddress: '',
        city: '',
        postCode: '',
        country: ''
      },
      clientName: '',
      items: [],
      paymentTerms: 'net-30',
      projectDescription: '',
      invoiceDate: format(new Date(), 'yyyy-MM-dd'), // Default to today
      dueDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'), // Default to today
      amount: 0
    }
  })

  const handleClose = () => {
    dispatch(toggleForm())
  }
  return (
    <div className='fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto'>
      <div className='bg-slate-800 p-8 rounded-lg w-full max-w-2xl mt-8 mb-8'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold uppercase'>New Invoice</h2>

          <button className='text-white hover:text-violet-500 transition-colors' onClick={handleClose}>
            <X size={24} />
          </button>

        </div>
        <form className='space-y-6'>
          <div className='space-y-4'>
            <h3 className='text-violet-500 font-bold uppercase'>Bill From</h3>
            <input type='text' 
              placeholder='Street Address' 
              value={formData.billFrom.streetAddress}
              onChange={(e) => setFormData({ ...formData, billFrom: { ...formData.billFrom, streetAddress: e.target.value } })}
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
          </div>

          <div className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <input type='text' 
              placeholder='City'
              value={formData.billFrom.city}
              onChange={(e) => setFormData({ ...formData, billFrom: { ...formData.billFrom, city: e.target.value } })}
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
            <input type='text' 
              placeholder='Post Code'
              value={formData.billFrom.postCode}
              onChange={(e) => setFormData({ ...formData, billFrom: { ...formData.billFrom, postCode: e.target.value } })}
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
            <input type='text' 
              placeholder='Country'
              value={formData.billFrom.country}
              onChange={(e) => setFormData({ ...formData, billFrom: { ...formData.billFrom, country: e.target.value } })}
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
          </div>

          <div className='space-y-4'>
            <h3 className='text-violet-500 font-bold uppercase'>Bill To</h3>
            <input type='text' 
              placeholder="Client's Name" 
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
            <input type='email' 
              placeholder="Client's Email" 
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
            <input type='text' 
              placeholder='Street Address' 
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
            <input type='text' 
              placeholder='City'
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
            <input type='text' 
              placeholder='Post Code' 
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
            <input type='text' 
              placeholder='Country' 
              required 
              className='w-full bg-slate-900 rounded-lg p-3' />
          </div>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <input type='date' 
                className='w-full bg-slate-900 rounded-lg p-3' />
              <select className='bg-slate-900 rounded-lg p-3' required>
                <option value=''>Net 30 Days</option>
                <option value='net-30'>Net 60 Days</option>
              </select>
            </div>
            <input type='text' placeholder='Invoice Description' required className='w-full bg-slate-900 rounded-lg p-3' />
          </div>

          <div className='space-y-4'>
            <h3 className='text-violet-500 font-bold'>Item List</h3>
            <div className='grid lg:grid-cols-12 gap-4'>
              <input 
                type='text' 
                placeholder='Item Name' 
                required 
                className='w-full bg-slate-900 rounded-lg p-3 col-span-4' />
              <input 
                type='number'
                placeholder='Quantity' 
                required 
                className='w-full bg-slate-900 rounded-lg p-3 col-span-3' min="0" step="1" />
              <input type='number' 
                placeholder='Price' 
                required 
                className='w-full bg-slate-900 rounded-lg p-3 col-span-2' min="0" step="0.01" />
              <div className='col-span-2 text-right'>
                Total Amount
              </div>
              <button type='button' className=' text-slate-400 hover:text-red-500'><Trash2 size={20} /></button>
            </div>
            <button type='button' className='w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex justify-center items-center space-x-2'>
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>
          <div className='flex justify-end space-x-4 mt-6'>
            <button type='button' className=' bg-violet-500 hover:bg-violet-700 text-white px-6 py-3 rounded-full'>Cancel</button>
            <button type='button' className=' bg-violet-500 hover:bg-violet-700 text-white px-6 py-3 rounded-full'>Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InvoiceForm