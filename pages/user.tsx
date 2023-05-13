import Link from 'next/link'
import { useUser } from '../context/user'

const User = () => {
  const { user } = useUser()

  const entries: Array<[string, any]> = user && Object.entries(user)

  return (
    <>
      <Link href="/"> Home </Link>
      <div> Hello {user?.email} </div>

      <div className="m-5">
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
    </>
  )
}

export default User