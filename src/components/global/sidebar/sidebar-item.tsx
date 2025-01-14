import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  icon: React.ReactNode
  title: string
  href: string
  selected: boolean
  notifications?: number
}

const SideBarItem = ({href, icon, title, selected, notifications}: Props) => {
  return (
    <li className='cursor-pointer my-[5px]'>
      <Link href={href} className={cn('flex items-center justify-between group rounded-lg',
        selected ? 'bg-[#1D1D1D]' : ''
      )}>
        <div className='flex items-center gap-2 transition-all p-[5px] cursor-pointer'>
          {icon}
          <span className={cn('font-medium group-hover:text-[#9D9D9D] transition-all truncate w-32',
            selected ? 'text-[#9D9D9D]' : 'text-[#545454]'
          )}>
            {title}
          </span>
        </div>
        {}
      </Link>
    </li>
  )
}

export default SideBarItem