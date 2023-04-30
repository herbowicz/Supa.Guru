import initStripe from 'stripe'
import Image from 'next/image'

const Shop = ({ products }) => {
    return (
        <div className='w-full max-w-3xl mx-auto py-16 flex justiify-around'>
            {products.map(el => (
                <div key={el.id} className='w-80 h-40 rounded shadow px-6 py-3'>
                    <h2 className='text-xl'>{el.name}</h2>
                    <Image src={el.photo} alt='' width='200' height='200' /> 
                    <p className='text-grey-500'>
                        ${el.price/100} / {el.interval}
                    </p>
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

    return {
        props: {
            products,
        }
    }
}
export default Shop