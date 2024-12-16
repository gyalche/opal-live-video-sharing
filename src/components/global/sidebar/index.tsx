'use client'
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  activeWorkspaceId: string,
}

const Sidebar = ({activeWorkspaceId}: Props) => {
  const router = useRouter();
  const onChangeActiveWorkSpace = (value:string) => {
    router.push(`/dashboard/${value}`)
  }
  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
      <div className='bg-[#111111] p-4 gap-2 flex justify-center items-center mb-4 absolute top-0 right-0 left-0'>
        <Image src={'/opal-logo.svg'} height={40} width={40} alt="logo" />
        <p className='text-2xl'>Opal</p>
      </div>
      <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkSpace}>
        <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className='bg-[#111111] backdrop-blur-xl'>
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Sidebar