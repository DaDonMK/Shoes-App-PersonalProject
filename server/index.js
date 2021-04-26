require('dotenv').config()
const{SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, AUTH_TOKEN, ACCOUNT_SID, STRIPE_KEY} = process.env

const cors = require('cors')
const express = require('express')
const massive = require('massive')
const twilio = require('twilio')
const stripe = require('stripe')(STRIPE_KEY)
const uuid = require('uuid').v4

const client = new twilio(ACCOUNT_SID, AUTH_TOKEN)

const app = express()
const session = require('express-session')
const shoesCtrl = require('./controllers/shoesCtrl')
const authCtrl = require('./controllers/authCtrl');


app.use(express.json())
app.use(cors())


app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
  }))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
.then(dbInstance => {
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => console.log(`Server is bumping on ${SERVER_PORT}`))
})
.catch(err => console.log(err))


app.post('/checkout', async(req, res) => {
    console.log('Request', req.body)

    let error;
    let status;

    try{
        console.log('hello i say')
        const {product, token} = req.body
        
        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id})

        const idempotencyKey = uuid()
        const charge = await stripe.charges.create({
            amount : product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`, 
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip

                }
            }
            // console.log('success'),

        },
        {
            
            idempotencyKey
        });
        console.log('charge:', {charge})
        status='success'
    }catch(error){
        console.log('the error is ' + error)
        status = 'failure'
    }
    res.json({error, status})
})



app.get('/message', (req, res) => {
    res.send('Welcome to express server')
})

app.get('/send-message', (req, res) => {
    const {recipient, textmessage} = req.query
     client.messages.create({
        body: textmessage,
        to: '+1'+recipient,
        from: '+19402685991'
    })
    .then((message) => {
        console.log(message.body)
    })
})

// app.get('/checkout', async(req, res) => {
//     console.log("Request:", req.body)

//     let error;
//     let status;

//     try{
//         const{product, token} = req.body
        
//         const customer = await
//         stripe.customers.create({
//             email: token.email,
//             source: token.id
//         });

//         const idempotency_key = uuid()
//         const charge = await stripe.charges.create(
//             {
            
//                 amount: product.price * 100,
//                 currency: "usd",
//                 customer: customer.id,
//                 receipt_email: token.email,
//                 description: `Purchased the ${product.shoe_name}`,
//                 shipping: {
//                     name: token.card.name,
//                     address: {
//                         line1: token.card.address_line1,
//                         line2: token.card.address_line2,
//                         city: token.card.address_city,
//                         country: token.card.address_country,
//                         postal_code: token.card.address_zip
//                     }
//                 }

//         },
//         {
//             idempotency_key
//         }
        
//         );
//         console.log("charge:", {charge})
//         status='success'
//     } catch(error){
//         console.log('Error:', error)
//         status = 'failure'
//     }
//     res.json({error, status})
// })



// authorization endpoints
// app.get('/auth/user-data', authCtrl.userData)
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.delete('/auth/logout', authCtrl.logout);
app.get('/auth/getUserData', authCtrl.userData)

//shoe endpoints
app.get('/api/shoes', shoesCtrl.getAll)
app.get('/api/shoe/:id', shoesCtrl.getBrand)
app.get('/api/popularShoe', shoesCtrl.getPop)
app.get('/api/high-low', shoesCtrl.highToLow)
app.get('/api/low-high', shoesCtrl.lowToHigh)
app.get('/api/name', shoesCtrl.nameSort)
app.get('/api/new', shoesCtrl.newRelease)
app.get('/api/popular/:brand', shoesCtrl.sortBrandbyPop)
app.get('/api/price-high-low/:brand', shoesCtrl.sortBrandbyPriceHightoLow)
app.get('/api/price-low-high/:brand', shoesCtrl.sortBrandbyPriceLowtoHigh)
app.get('/api/name/:brand', shoesCtrl.sortBrandbyName)


//cart endpoints
app.post('/api/cart', shoesCtrl.create)
app.get('/api/cart', shoesCtrl.getCart)
app.put('/api/cart/:name', shoesCtrl.updatePrice)
app.delete('/api/cart/:id', shoesCtrl.deleteItem)
