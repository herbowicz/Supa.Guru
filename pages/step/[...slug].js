import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const start = [
    'bleeding sophistication and inovation',
    'endless inspiration and opportunity to innovate',
    'it\'s our fundamental belief',
    'endless urban inspiratons'
]
const middle = [
    'with contemorary urban culture in mind',
    'to get a cleear vision of where we are headed',
    'that every user experience design decision',
    'that radiates elegance and harmony'
]

const end = [
    'say hello to the shape of the future',
    'will get us up close and personal with the design of tomorrow',
    'is fuelled by the desire for creating a strong emotional connection',
    'is gamification at the highest level'
]

var item = arr => arr[Math.floor(Math.random() * arr.length)]

const cap = str => str.charAt(0).toUpperCase() + str.slice(1)

const say = () => cap(item(start)) + ', ' + item(middle) + ' ' + item(end) + '.'

const I = () => {
    const router = useRouter()
    const { slug } = router.query

    useEffect(() => {
        console.log({ slug })
    }, [slug])

    const nextPage = () => {
        const next = +slug + 1
        router.push(`/step/${next}`)
    }
    
    return (
        <div onClick={() => nextPage()} className='flex flex-col align-center justify-around w-3/4 mx-auto bg-violet-900 mt-5 p-10 cursor-pointer'>
            {/* <h3> slug {slug} </h3> */}
            <h2 className={`w-3/4 text-3xl mx-auto m-10 p-10`}>{say()}</h2>
            
        </div>
    )
}

export default I

