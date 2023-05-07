import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/supabase'
import { useRouter } from 'next/router'

export default function Welcome() {
  const router = useRouter()
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    
    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'facebook', 'github', 'twitter']}
        theme="dark"
      />)
  }
  else {
    console.log({session})
    // router.push('/profile')
    return (
      <div>
        <p className={`my-5`}>
          Welcome {session.user.email}
        </p>
        <p className={`text-xs`}>
          {JSON.stringify(session.user.identities[0], null, 2)}
        </p>
      </div>
    )
  }
}