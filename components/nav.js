import Link from 'next/link'
import { useUser } from '../context/user'

const Nav = () => {
    const { user } = useUser()

    return (
        <nav className='flex gap-2 justify-items-stretch py-4 px-6 border-b border-gray-200'>
            <Link href='/'>Home</Link>
            <Link href='/shop'>Shop</Link>
            <Link href={user ? '/logout' : '/login'}>
                {user ? 'Logout' : 'Login'}
            </Link>

        </nav>
    )
}

export default Nav