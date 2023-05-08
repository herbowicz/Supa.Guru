import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Welcome() {
  const session = useSession()
  const supabase = useSupabaseClient()

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
          {JSON.stringify(session.user)}
        </p>
      </div>
    )
  }
}