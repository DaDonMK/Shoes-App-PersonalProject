import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import {toast} from 'react-toastify'
import {useState, useEffect} from 'react'


toast.configure()
const Message = (props) => {

    const [product] = useState({
        name: 'Checkout',
        price: props.total,
    })

    // async function handleToken(token) {
    //     const response = await axios.post('http://localhost:4200/checkout', {
    //         token,
    //         product
    //     })
    //     const {status} = response.data

    //     if(status === 'success'){
    //         console.log('success')
    //         toast.success('PAYMENT SUCCESSFUL')
    //     }else{
    //         console.log('eroor')

    //         toast.error('PAYMENT UNSECESSFUL')
    //     }
    // }

     function handleToken (token){

        axios.post('http://localhost:4200/checkout', {
            token,
            product
        })
        .then(res => {
            if(res.data.status === 'success'){
                console.log('success')
                toast.success('PAYMENT SUCCESSFUL')
            }else {
                console.log('eroor   ' + res.data)

                toast.error('PAYMENT UNSECESSFUL')

            }
        }).catch(error => console.log(error))
        // const {status} = response.data

        // if(status === 'success'){
        //     console.log('success')
        //     toast.success('PAYMENT SUCCESSFUL')
        // }else{
        //     console.log('eroor')

        //     toast.error('PAYMENT UNSECESSFUL')
        // }
    }
       
        return(
            console.log('price mapped:' + props.total),
            <div style={{marginTop: 10}}>
                <StripeCheckout 
            stripeKey='pk_test_51IjsfbEQXX21qGTx6s9KTxi3wpkYac6srTirK8v30Osc5HZPXpxo4u2kGXXcmRg25iw02y9Rbd3I5IDCeMFzxnM9007W774VXd'
            token={handleToken}
            billingAddress
            shippingAddress
            amount={product.price * 100}
            name={product.name}/>

            </div>
        )
    }

export default Message