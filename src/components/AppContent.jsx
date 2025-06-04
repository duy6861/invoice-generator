
import Header from './Header'
import InvoiceList from './InvoiceList'
import InvoiceForm from './InvoiceForm'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../store/invoiceSlice' // Correctly importing toggleForm

function AppContent() {
  const dispatch = useDispatch()
  const isFormOpen = useSelector((state) => state.invoice.isFormOpen)
  const handleNewInvoice = () => {

    dispatch(toggleForm())
  }
  return (
    <div className='bg-slate-900 text-white min-h-screen'>
      <div className=' max-w-5xl mx-auto py-12 px-4'>
        <Header onNewInvoice={handleNewInvoice} />
        <InvoiceList />
        {isFormOpen && <InvoiceForm />} {/* Fixed condition */}
      </div>
    </div>
  )
}

export default AppContent