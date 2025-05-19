import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Filter } from 'lucide-react'
function Header() {
  return (
    <div className='flex items-center justify-between'>
      <div >
        <h1 className='text-3xl font-bold text-while mb-2'>Invoices</h1>
        <p className='text-slate-400'>There are 0 total invoices</p>
      </div>
      <div className='flex items-center space-x-4'>
        <Menu as='div' className='relative'>
          <Menu.Button className='flex items-center space-x-2 text-white'>
            <Filter size={20} />
            <span>Filter by Status</span>
          </Menu.Button>
        </Menu>
      </div>
    </div>

  )
}

export default Header