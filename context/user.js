import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { supabase } from "../utils/supabase"
    
const Context = createContext()

const Provider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getUserProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: profile } = await supabase
                    .from('profile').select('*').eq('id', user.id).single()
                // console.log('!!!!', user, profile)
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
