import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import SelectAvatar from './SelectAvatar'

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
    console.log({ session })
    return (
      <>
        <SelectAvatar />
      </>
    )
  }
}