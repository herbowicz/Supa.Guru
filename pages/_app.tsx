import '@/styles/globals.css'
import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import UserProvider from '../context/user'
import Nav from '../components/nav'

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
    supabaseClient={supabaseClient}
    initialSession={pageProps.initialSession}
  >
    <UserProvider>
      <Nav />
      <Component {...pageProps} />
    </UserProvider>
  </SessionContextProvider>
  )
}
