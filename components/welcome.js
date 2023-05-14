import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'

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
    // router.push('/profile')
    return (
      <div className='flex flex-col bg-green-900/10 p-5 text-center'>
        <Image className={`mx-auto`} src='https://robohash.org/autquiaut.png?size=250x250&set=set2' alt='robohash' width='250' height='250' />
        <p className={`my-5 text-2xl`}>
          Welcome {session.user.email}
        </p>

        <p className={`p-5 text-xl`}>
          Let the Journey Begin!
        </p>

        <p className={`text-xs w-full overflow-hidden`}>
          {JSON.stringify(session.user, null, 2)}
        </p>
      </div>
    )
  }
}