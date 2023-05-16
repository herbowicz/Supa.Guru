import initStripe from 'stripe'
import Image from 'next/image'
import axios from 'axios'
import { useUser } from '../context/user'

const Shop = ({ products, isLoading }) => {
    const { user, login } = useUser()

    const processSubscription = priceId => {
        
        console.log(priceId)
        console.log({user})
        
        // const getSub = async () => {
        //     const { data } = await axios.get(`/api/subscription/${priceId}`)
        // }

        // getSub().then(data => console.log(data))
    }

    return (
        <div className='w-full max-w-3xl mx-auto py-16 flex justiify-around'>
            {products.map(el => (
                <div key={el.id} className='w-80 h-80 rounded shadow bg-indigo-900 px-6 py-3 mx-5 flex flex-col justify-around items-center'>
                    <h2 className='text-xl'>{el.name}</h2>
                    <Image src={el.photo} alt='' width='200' height='200' />
                    <p className='text-grey-500'>
                        {el.price / 100} PLN / {el.interval}
                    </p>
                    {isLoading || (user?.is_subscribed ? (
                        <button onClick={login}>Manage Subscription</button>
                    ) : (
                        <button onClick={() => processSubscription(el.id)}>Subscribe</button>
                    )
                    )}

                </div>
            ))}
            <hr />
            {/* {JSON.stringify(prices, null, 2)} */}
        </div>
    )
}

export const getStaticProps = async () => {
    const stripe = initStripe(`${process.env.STRIPE_SECRET_KEY}`)

    const { data: prices } = await stripe.prices.list()

    const products = await Promise.all(
        prices.map(async (price) => {
            const product = await stripe.products.retrieve(price.product)

            return {
                id: price.id,
                name: product.name,
                price: price.unit_amount,
                interval: price.recurring.interval,
                currency: price.currency,
                photo: product.images[0]
            }
        })
    )

    const sortedProducts = products.sort((a, b) => a.price - b.price)

    return {
        props: {
            products: sortedProducts
        }
    }
}

export default Shop