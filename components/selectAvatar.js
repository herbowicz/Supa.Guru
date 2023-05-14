import { useState } from 'react'
import Image from 'next/image'
import { useUser } from '../context/user'

export default function SelectAvatar() {
    const { user } = useUser()
    
    return (
        <div className='flex flex-col bg-green-100/1 p-5 text-center'>
            <Image className={`mx-auto`} src='https://robohash.org/autquiaut.png?size=250x250&set=set2' alt='robohash' width='250' height='250' />

            <p className={`p-5 text-xl`}>
                Select your Avatar
            </p>

            <p>
                {new Array(5).fill().map((el, i) => (
                    <Image key='i' className={`p-4 inline-block`} alt='robohash' width='100' height='100'
                        src={`https://robohash.org/autquiaut.png?size=50x50&set=set${i + 1}`} />
                ))}
            </p>

            <p className={`mt-3 text-xs overflow-hidden text-orange-600`}>
                {JSON.stringify(user, null, 2)}
            </p>
        </div>
    )
}
