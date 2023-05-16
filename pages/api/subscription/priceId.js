import initStripe from 'stripe'

const handler = async (req, res) => {

    const stripe = initStripe(process.env.STRIPE_SECRET_KEY)

    // const customer = await stripe.customers.create({
    //     email: req.body.record.email,
    // })

    console.log('Request', req.body)

    console.log('stripe', stripe)

    // await supabase
    //     .from('profile')
    //     .update({
    //         stripe_customer: customer.id
    //     })
    //     .eq('id', req.body.record.id)

    return 
    // res.send({
    //     message: `Stripe customer created: ${customer.id}`
    // })
}

export default handler