import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Context = createContext()

const Provider = ({ children }) => {
    const supabase = useSupabaseClient()
    const router = useRouter()
    const [user, setUser] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getUserProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: profile } = await supabase
                    .from('profile').select('*').eq('id', user.id).single()

                setUser({
                    ...user,
                    ...profile
                })
                setLoading(false)
            }
        }
        getUserProfile()
        supabase.auth.onAuthStateChange(() => {
            getUserProfile()
        })
    }, [])

    useEffect(() => console.log(user))

    const login = async () => {
        supabase.auth.signInWithOAuth({
            provider: ['github']
        })
    }

    const logout = async () => {
        supabase.auth.signOut()
        setUser(null)
        router.push('/')
    }

    const exposed = {
        user,
        login,
        logout,
        isLoading
    }

    return (
        <Context.Provider value={exposed}>
            {children}
        </Context.Provider>
    )
}

export const useUser = () => useContext(Context)

export default Provider;
