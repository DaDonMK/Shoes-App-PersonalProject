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

    const [btn, setbtn] = useState(false)
    const [input_email, setinput_email] = useState('')
    

     function handleToken (token){

        axios.post('http://localhost:4200/checkout', {
            token,
            product
        })
        .then(res => {
            if(res.data.status === 'success'){
                setbtn(true)
                console.log('success')
                
                toast.success('PAYMENT SUCCESSFUL')

            }else {
                console.log('eroor   ' + res.data)

                toast.error('PAYMENT UNSECESSFUL')

            }
        }).catch(error => console.log(error))

    }


    function email() {
        let email_add = input_email
        // const email_add2 = 'foreverything005@gmail.com'

        axios.post('http://localhost:4200/email', {email_add})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log('error in email ' + err))
    }

    function sendText(number){
        console.log('send text: ' + number)
        const message = 'Order on the Way!'

        fetch(`http://localhost:4200/send-message?recipient=${number}&textmessage=${message}`)
        // .then(res => console.log('success twilio ' + res.data))
        // .then(response => response.json())

        // .then( toast.success('Text send to ' + number))
        .catch(err => toast.error(err))
    }

    function checkOut(){
        // const {text} = this.state

        const number = window.prompt('Enter phone number (only numbers)')
        console.log(number)
        sendText(number)
    //    <button onClick={this.sendText}>Send Text</button>
    }

    function inputVal(input){
        setinput_email(input)
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
            
            <div>
                {btn === true ? 
                <section>
                    <input onChange={(event) => inputVal(event.target.value)}/>
                    <button onClick={email}>Email</button> 
                    <section>
                        <button onClick={checkOut}>Send message with TWILIO</button>
                    </section>
                </section>
                : null}
            </div>


            </div>
        )
    }

export default Message