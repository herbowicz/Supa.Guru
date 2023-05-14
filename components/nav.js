import Link from 'next/link'
import { useUser } from '../context/user'

const Nav = () => {
    const { user } = useUser()

    return (
        <nav className='flex max-w-xl mx-auto justify-center gap-5 py-4 px-6 border-b border-[color:var(--main)] text-[color:var(--main)]'>
            {user && <div>{user?.points}</div>}
            <Link href='/'>Home</Link>
            <Link href='/shop'>Shop</Link>
            <Link href='/user'>User</Link>
            <Link href='/notes'>Notes</Link>
            {user && <Link href='/logout'>Logout</Link>}
        </nav>
    )
}

export default Nav