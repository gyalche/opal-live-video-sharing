'use server';

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkSpace = async (workspaceId: string) => {
    try {
      const user = await currentUser();
      if(!user) return {status: 403};

      const isUserInWorkSpace = await client.workSpace.findUnique({
        where: {
          id: workspaceId,
          OR: [
            {
              User: {
                clerkid: user.id,
              }
            }, 
            {
              members: {
                every: {
                  User: {
                    clerkid: user.id
                  }
                }
              }
            }
          ]
        }
      })
      return { status: 200, data: { workspace: isUserInWorkSpace}}
    } catch (error) {
        return { status: 403, error, data: { workspace: null}}
    }
}

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          }
        }
      }
    })
    if(isFolders && isFolders.length>0){
      return {status: 200, data: isFolders}
    }
    return { status: 404, data: []}
  } catch (error) {
    return { status: 403, data: [], error}
  }
}

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if(!user) return { status: 404 };
    const videos = await client.video.findMany({
      where: {
        OR: [{workSpaceId}, { folderId: workSpaceId }]
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          }
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }

    })
    if(videos && videos.length > 0 ){
      return { status: 200, data: videos}
    }
    return {status: 404}
  } catch (error) {
    return { status: 400, error, }
  }
}

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if(!user) return {status: 404}

    const workspaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          }
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          }
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              }
            }
          }
        }
      }
    });
    if(workspaces) return { status: 200, data: workspaces }
  } catch (error) {
    return {status: 400, error}
  }
};

export const getNotifications = async () => {
 try {
  const user = await currentUser();
  if(!user) return { status: 400}
  const notifications = await client.user.findUnique({
    where: {
      clerkid: user.id
    },
    select: {
      notification: true,
      _count: {
        select:{
          notification: true,
        }
      }
    }
  });
  if(notifications && notifications.notification.length > 0 ) return {status:200, data: notifications}
    return { status: 404, data: []}
 } catch (error) {
    return { status: 400, data: [], error}
 }
}