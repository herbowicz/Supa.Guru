import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { supabase } from '../../utils/supabase'

const Nick = () => {
    const [profile, setProfile] = useState({})
    const router = useRouter()
    const { nick } = router.query

    useEffect(() => {
        console.log({ nick })

        const getProfile = async (nick) => {
            const { data: dbProfile } = await supabase.from('profile').select('*').eq('email', nick).single()

            console.log('dbProfile', dbProfile)

            setProfile(dbProfile)
        }

        getProfile(nick)
    }, [nick])

    const hidden = ['id', 'stripe_customer', 'is_subscribed', 'interval']

    return (
        <div className="flex flex-col align-center justify-around bg-violet-900 mt-5 p-10">
            <h3><p>Profile {nick}</p></h3>
            <hr />
            <div className="flex flex-col mt-10">
                <div>
                    <h2>{profile?.email}</h2>
                    <div style={{ maxWidth: 200, maxHeight: 200 }}>
                        <Image
                            style={{
                                objectFit: 'cover',
                                borderRadius: '50%'
                            }}
                            src={profile?.photoURL || '../../public/next.svg'}
                            width='200'
                            height='200'
                            alt='' />
                    </div>
                </div>
                <div className="mt-3">
                    <>
                        {profile && Object.entries(profile)
                            .filter(([key]) => !hidden.includes(key))
                            .map(([key, value], i) => (
                                <div key={i}>
                                    <span> {key} </span>
                                    <span> {value} </span>
                                </div>
                            ))
                        }
                    </>
                </div>
            </div>
        </div>
    )
}

export default Nick

