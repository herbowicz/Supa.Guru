import initStripe from 'stripe'
import { supabase } from '../../utils/supabase'

const handler = async (req, res) => {
if(req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send('You are not authorized to call.')
}

    const stripe = initStripe(process.env.STRIPE_SECRET_KEY)

    const customer = await stripe.customers.create({
        email: req.body.record.email,
    })

    console.log('Request', req.body)

    await supabase
        .from('profile')
        .update({
            stripe_customer: customer.id
        })
        .eq('id', req.body.record.id)

    return res.send({
        message: `Stripe customer created: ${customer.id}`
    })
}

export default handler