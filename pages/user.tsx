import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '../utils/supabase'
import { useUser } from '../context/user'
import UserForm from '../components/userForm'

const User = () => {
  const { user } = useUser()
  const [isEdit, setEdit] = useState(false)

  const entries: Array<[string, any]> = user && Object.entries(user)

  const sendData = (e: { preventDefault: () => void }, content: any) => {
    e.preventDefault()
    console.log('content', content)

    const {id, aud, email, email_confirmed_at, phone, confirmed_at, last_sign_in_at, app_metadata, user_metadata, identities, created_at, updated_at, ...rest} = content

    const updateUserProfile = async () => {
      const { error } = await supabase
        .from('profile')
        .update(rest)
        .eq('id', content.id)

      if (error) console.log({ error })
    }
    updateUserProfile()
  }


  return (
    <>
      <Link href="/"> Home </Link>
      <div> Hello {user?.email} </div>

      {isEdit ? (
        <>
          <UserForm sendData={sendData} data={user} />
        </>
      ) : (
        <div className="m-5">
          <Image src='https://robohash.org/autquiaut.png?size=250x250&set=set3' alt='robohash' width='250' height='250' />
          <>
            {entries?.map(([key, value], i) => (
              <div key={i}>
                <span> {key} </span>
                <span> {JSON.stringify(value, null, 2)} </span>
              </div>
            ))
            }
          </>
        </div>
      )}

      <div className='my-2'>
        <button onClick={() => setEdit(!isEdit)}>
          {isEdit ? 'Close' : 'Edit'}
        </button>
      </div>
    </>
  )
}

export default User