'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'


const client = new QueryClient();
const ReactQueryProvider = ({children}: PropsWithChildren) => {
  return <QueryClientProvider client={client}>
    {children}
  </QueryClientProvider>
}

export default ReactQueryProvider