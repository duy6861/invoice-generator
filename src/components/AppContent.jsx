
import Header from './Header'
import InvoiceList from './InvoiceList'
import InvoiceForm from './InvoiceForm'
import InvoiceDetail from './InvoiceDetail'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedInvoice, toggleForm } from '../store/invoiceSlice' // Correctly importing toggleForm

function AppContent() {
  const dispatch = useDispatch()
  const { isFormOpen, selectedInvoice } = useSelector((state) => state.invoice)
  console.log("isFormOpen", isFormOpen)
  const handleNewInvoice = () => {

    dispatch(toggleForm())
  }
  useEffect(() => {
    dispatch(setSelectedInvoice(null)) // Reset selected invoice when component mounts
  }, [])
  return (
    <div className='bg-slate-900 text-white min-h-screen'>
      <div className=' max-w-5xl mx-auto py-12 px-4'>
        <Header onNewInvoice={handleNewInvoice} />
        {selectedInvoice ? <InvoiceDetail invoice={selectedInvoice} /> : <InvoiceList />}
        {isFormOpen && <InvoiceForm invoice={selectedInvoice} />}
        {/* <InvoiceList /> */}

      </div>
    </div>
  )
}

export default AppContent