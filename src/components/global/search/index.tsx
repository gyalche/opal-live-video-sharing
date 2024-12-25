import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearch } from '@/hooks/useSearch'
import { User } from 'lucide-react'
import React from 'react'

type Props = {
  workspaceId: string
}

const Search = ({workspaceId}: Props) => {
  const { query, onSearchQuery, isFetching, onUsers: onUser} = useSearch('get-users', 'USERS');

  return (
    <div className='flex flex-col gap-y-5'>
      <Input onChange={onSearchQuery} 
        value={query} 
        className='bg-transparent border-2 outline-none'
        placeholder='Search for users'
        type = "text"  
      />
      {[{id: 'sdfasdfasdf', image: 'sdfasdfasdf', firstname: 'dawa', lastname:'sherpa' }].map((user) => (
        <div key={user?.id}
          className='flex gap-x-3 items-center border-2 w-full p-3 rounded-xl'
        >
          <Avatar>
            <AvatarImage src={user?.image as string} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <h3 className="text-bold text-lg capitalize">
              {user?.firstname} {user?.lastname}
            </h3>
          </div>
        </div>
      ))}
      {isFetching ? <div className='flex flex-col gap-y-2'>
        <Skeleton className='w-full h-8 rounded-xl' />
      </div> : !onUser ? (
        <p className='text-center text-sm text-[#a4a4a4]'> No Users Found</p>
      ) : (
        <></>
        // <div>
        //   {onUser?.map(() => <div key={user.id} className='flex gap-x-3 items-center w-full p-3 rounded-xl'>

        //   </div>)}
        // </div>
      )
      }
    </div>
  )
}

export default Search