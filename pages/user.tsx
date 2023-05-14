import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '../utils/supabase'
import { useUser } from '../context/user'
import UserForm from '../components/userForm'

const User = () => {
  const { user } = useUser()
  const [isEdit, setEdit] = useState(false)
  const [editables, setEditables] = useState({})

  useEffect(() => {
    const fromAuth = ['aud', 'email', 'email_confirmed_at', 'phone', 'confirmed_at', 'last_sign_in_at', 'app_metadata', 'user_metadata', 'identities', 'created_at', 'updated_at']
    const hidden = ['stripe_customer', 'is_subscribed', 'interval']

    if (user) {

      const filteredUsers = Object.keys(user)
        .filter(key => !fromAuth.includes(key))
        .filter(key => !hidden.includes(key))
        .reduce((obj: Record<string, number>, key) => {
          obj[key] = user[key];
          return obj;
        }, {});

      setEditables(filteredUsers)
    }
  }, [user])


  const sendData = (e: { preventDefault: () => void }, content: any) => {
    e.preventDefault()
    console.log('content', content)

    const { id, aud, email, email_confirmed_at, phone, confirmed_at, last_sign_in_at, app_metadata, user_metadata, identities, created_at, updated_at, ...rest } = content

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
    <div className='mx-auto p-5'>
      <div> Hello {user?.email} </div>

      {isEdit ? (
        <>
          <UserForm sendData={sendData} data={editables} />
        </>
      ) : (
        <div className='w-full bg-violet-500/5 mx-auto m-5 p-5 overflow-hidden text-center'>
          <Image src='https://robohash.org/autquiaut.png?size=250x250&set=set3' alt='robohash' width='250' height='250' className='rounded-full bg-green-400/50 mx-auto mb-5'/>

          {Object.entries(editables)?.map(([key, value], i) => (
            <div key={i}>
              <span> {key} </span>
              <span> {String(value)} </span>
            </div>
          ))}

        </div>
      )}

      <div className='my-2'>
        <button className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2' onClick={() => setEdit(!isEdit)}>
          {isEdit ? 'Close' : 'Edit'}
        </button>
      </div>
    </div>
  )
}

export default User