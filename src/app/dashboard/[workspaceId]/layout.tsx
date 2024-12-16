import { onAuthenticateUser } from '@/actions/user'
import { getAllUserVideos, getNotifications, getWorkSpaces, getWorkspaceFolders, verifyAccessToWorkSpace } from '@/actions/workspace'
import { redirect } from 'next/navigation'
import React from 'react'
import {HydrationBoundary, QueryClient, dehydrate} from '@tanstack/react-query';
import Sidebar from '@/components/global/sidebar';
type Props = {
    params: { workspaceId: string }
    children: React.ReactNode
}

const Layout = async ({params: { workspaceId}}: Props) => {
  const auth = await onAuthenticateUser();
  if(!auth.user?.workspace) redirect('/auth/sign-in');
  if(!auth.user.workspace.length) redirect('/auth/sign-in');
  const hasAccess = await verifyAccessToWorkSpace(workspaceId);

  if(hasAccess.status !==200) redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  if(!hasAccess?.data?.workspace) return null;

  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ['workspace-folder'],
    queryFn: () => getWorkspaceFolders(workspaceId),
  })
  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(workspaceId),
  })
  await query.prefetchQuery({
    queryKey: ['user-workspaces'],
    queryFn: () => getWorkSpaces(),
  })
  await query.prefetchQuery({
    queryKey: ['user-notification'],
    queryFn: () => getNotifications(),
  })
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className='flex h-screen w-screen'>
        <Sidebar activeWorkspaceId={workspaceId}/>
      </div>
    </HydrationBoundary>

  )
}

export default Layout