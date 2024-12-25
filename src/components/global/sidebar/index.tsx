'use client'
import { getWorkSpaces } from '@/actions/workspace'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { userQueryData } from '@/hooks/userQueryData'
import { WorkspaceProps } from '@/types/index.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Modal from '../modal'
import { PlusCircle } from 'lucide-react'
import Search from '../search'

type Props = {
  activeWorkspaceId: string,
}

const Sidebar = ({activeWorkspaceId}: Props) => {
  const router = useRouter();
  const {data, isFetched} = userQueryData(['user-workspaces'], getWorkSpaces);

  const { data: workspace} = data as WorkspaceProps;

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
            <Separator />
            {workspace?.workspace?.map((workspace) => <SelectItem key={workspace.id} value={workspace.id}>
              {workspace.name}
            </SelectItem>)}
            {workspace?.members?.length > 0 && workspace?.members?.map((workspace) => workspace.workspace && (
              <SelectItem key={workspace.Workspaces.id} value={workspace.Workspaces.id}>
                {workspace.Workspaces.name}
              </SelectItem>
            )) }
          </SelectGroup>
        </SelectContent>
      </Select>

      <Modal trigger={<span className='text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60
      w-full rounded-sm p-[5px] gap-2'>
        <PlusCircle size={15} className='text-neutral-800/90 fill-neutral-500' />
        <span className='text-neutral-400 font-semibold text-xs'> Invite To Workspace</span>
      </span>} 
      title="Invite To Workspace"
      description='Invite other users to your workspace'
      >
        <Search workspaceId={activeWorkspaceId}/>
      </Modal>
    </div>
  )
}

export default Sidebar