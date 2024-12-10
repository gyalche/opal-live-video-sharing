import { onAuthenticateUser } from '@/actions/user'
import { getAllUserVideos, getWorkspaceFolders, verifyAccessToWorkSpace } from '@/actions/workspace'
import { redirect } from 'next/navigation'
import React from 'react'
import {QueryClient} from '@tanstack/react-query';
type Props = {
    params: { workspaceId: string }
    children: React.ReactNode
}

const Layout = async ({params: { workspaceId}, children}: Props) => {
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
    <div>
        {children}
    </div>
  )
}

export default Layout