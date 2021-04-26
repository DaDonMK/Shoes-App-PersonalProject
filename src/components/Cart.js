import axios from 'axios'
import React, {Component} from 'react'
import Header from './Header'
import StripeCheckout from 'react-stripe-checkout'
import {toast} from 'react-toastify'
import Message from './Message'
import { CurrentCallPage } from 'twilio/lib/rest/preview/trusted_comms/currentCall'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'

toast.configure()
class Cart extends Component{

    constructor(){
        super()

        this.state = {
            cart2 : [],
            totalprice: 0,
            input: '',
            quant: 1,
            count: 0,
            test: [],
            text: {
                textmessage: 'Order on the WAY!'
            },
            logIn: false
        }
        // this.handleToken=this.handleToken.bind(this)
    }

    //  async handleToken(token) {
    //      console.log(this.state.price)
    //     const response = await axios.post('http://localhost:4200/checkout', {
    //         token,
    //         product: {
    //             name: 'nike air force',
    //             price: 50
    //         }
    //     })
    //     const {status} = response.data

    //     if(status === 'success'){
    //         toast.success('SUCCESS')
    //     }else{
    //         toast.error('ERROR')
    //     }
    // }


    async componentDidMount(){
        
         let res = await axios.get('/api/cart')


        // axios.get('/api/cart')
        // .then(res => {
            // cart2.push(res.data)
            
            // console.log(cart2)
            this.setState({cart2: res.data})
            console.log(this.state.cart2)
            this.setState({test: this.state.cart2})

            if(this.props.logg.loggedIn === true){
                this.setState({login: true})
            }
            // this.setState({price: this.state.cart2[this.state.count].price})
        // })
        // .catch(err => console.log(err + ' in getcart'))
    }


    checkOutDisplay(){

    }

    sendText = (number) => {
        console.log('send text: ' + this.state.text.recipient)
        const {text} = this.state

        fetch(`http://localhost:4200/send-message?recipient=${number}&textmessage=${text.textmessage}`)
        .catch(err => console.log(err))
    }

    checkOut = () => {
        // const {text} = this.state

        const number = window.prompt('Enter phone number (only numbers)')
        console.log(number)
        this.setState({text: {recipient: number}})
        this.sendText(number)
    //    <button onClick={this.sendText}>Send Text</button>
    }

    inputVal(input){
        this.setState({input: input})
    }

    setQuant(input, id, price, name, image, size, original_price){
        this.setState({input: ''})
        console.log('name ' + original_price)
        this.setState({quant: input})
        axios.put(`/api/cart/${name}`, {quant: input, price: price, image: image, size: size, original_price: original_price})
        .then(res => {
            console.log(res.data)
            this.setState({cart2: res.data})
            console.log('cart: ' +this.state.cart2.price)
        })
        .catch(err => console.log(err + ' in setQuant'))
        window.location.reload(true)

    }

    deleteItem(id){
        console.log(id)
        axios.delete(`/api/cart/${id}`)
        .then(res => {
            console.log(res.data)
            this.setState({cart2: res.data})
        })
        .catch(err => console.log(err + ' in deleteItem'))

    }



    render(){

        if(this.state.cart2.length === 0){
            console.log('cart empty')

            return <div>
                <Header />
                <h1>Cart Empty</h1>
                </div>
        }
        
        // console.log(this.state.cart2)
        //add turnery ar pair(s)
        let cartMapped = this.state.cart2.map((element, i) => {

            return <div key={i}>
                {/* {this.setState({price: this.state.price + element.price})} */}
                <h4 className='cart-name'>{element.name}</h4>
                <img className = 'shoe-images' src={element.image} alt='images' />
                <h5>Size: {element.size}</h5>
                <h5>Price: ${element.price}</h5>
                <input 
                type="text"
                placeholder="Quantity"
                 onChange={(event) => this.inputVal(event.target.value)}></input>
                <h5>You selected: {element.quant} pair(s) of {element.name}</h5>  
                
                <button onClick={() => this.setQuant(this.state.input, element.id, element.price, element.name, element.image, element.size, element.original_price)}>Set Quantity</button>
                <button onClick={() => this.deleteItem(element.id)}>Delete</button>
            </div>
  
        })

        let priceMapped = this.state.cart2.reduce((acc, curr) => {
                return acc += curr.price
        }, 0)

       
        return(
            <div>
                <Header />
                <section className = 'cart-all'>
                    
                <div className='cart-img'>{cartMapped}</div>
                <img className='cart-gif' src='https://media2.giphy.com/media/jSKhTr9js8KXIwctF7/giphy.gif' alt='cartimage'/>
                <div className='checkout'>
                    <h2>CHECKOUT</h2>
                    {/* {this.checkOutDisplay} */}
                    <h2>{this.props.logg.loggedIn ? <div>
                        <button onClick={this.checkOut}>Send message with TWILIO</button>
                        <h3 clasName='total'>Total: ${priceMapped}</h3>
                         <Message total = {priceMapped}/>                    
                    </div> 
                    :
                    <h3>Log in to Checkout</h3>}</h2>
                
                </div>
                </section>
            </div>
        )
    }

}
function mapStateToProps(state) {

    return({ 
      logg: state.logg,
    })
  }

  export default connect(mapStateToProps, { loginUser, logoutUser })(Cart)