import { Search } from 'lucide-react'
import React from 'react'

type Props = {}

const InfoBar = (props: Props) => {
  return (
    <header className='pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4'>
      <div className='flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg'>
        <Search />
      </div>
    </header>
  )
}

export default InfoBar