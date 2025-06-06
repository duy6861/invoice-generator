import React from 'react'
import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Filter, Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
function Header({ onNewInvoice }) {
  const { invoiceList, filter } = useSelector((state) => state.invoice)
  const status = ["all", "paid", "pending", "draft"]
  return (
    <header className='flex items-center justify-between mb-8'>
      <div >
        <h1 className='text-3xl font-bold text-while mb-2'>Invoices list</h1>
        <p className='text-slate-400'>{invoiceList.length === 0 ? "No Invoice" : `There Are ${invoiceList.length} Total Invoices`}</p>
      </div>
      <div className='flex items-center space-x-4'>
        <Menu as='div' className='relative'>
          <MenuButton className='flex items-center space-x-4 text-white '>
            <Filter size={20} />
            <span>Filter by Status</span>
          </MenuButton>
          <MenuItems transition className='absolute right-0 bg-slate-800 rounded-lg shadow-lg mt-2 w-48 z-10 transition-all duration-200 ease-out'>
            {status.map((item, index) => {
              return (
                <MenuItem key={index}>
                  {({ active }) => (
                    <Button className={`${active ? "bg-slate-700" : ""} w-full text-left px-4 py-2 rounded-lg capitalize ${filter === item ? "text-violet-500 " : "text-white"}`}>
                      {item}
                    </Button>
                  )}
                </MenuItem>
              )
            })}
          </MenuItems>
        </Menu>
        <Button type='button' className='bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:scale-105 transition-all duration-200' onClick={onNewInvoice}>
          <div className='bg-white rounded-full p-2 '>
            <Plus size={16} className='text-violet-500' />
          </div>
          <span className=''>New Invoice</span>
        </Button>

      </div>
    </header>

  )
}

export default Header