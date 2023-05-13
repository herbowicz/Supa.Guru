import Link from 'next/link'
import { useUser } from '../context/user'

const User = () => {
  const { user } = useUser()

  return (
    <>
      <Link href="/"> Home </Link>
      <div> Hello {user.email} </div>
      <pre> {JSON.stringify(user, null, 2)} </pre>
    </>
  )
}

export default User