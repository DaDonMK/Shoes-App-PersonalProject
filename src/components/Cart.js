import axios from 'axios'
import React, {Component} from 'react'
import Header from './Header'
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
            logIn: false
        }
    }


    async componentDidMount(){
        
         let res = await axios.get('/api/cart')

            this.setState({cart2: res.data})
            console.log(this.state.cart2)
            this.setState({test: this.state.cart2})

            if(this.props.logg.loggedIn === true){
                this.setState({login: true})
            }
    }



    // sendText = (number) => {
    //     console.log('send text: ' + number)
    //     const message = 'Order on the Way!'

    //     fetch(`http://localhost:4200/send-message?recipient=${number}&textmessage=${message}`)
    //     // .then(res => console.log('success twilio ' + res.data))
    //     // .then(response => response.json())

    //     // .then( toast.success('Text send to ' + number))
    //     .catch(err => toast.error(err))
    // }

    // checkOut = () => {
    //     // const {text} = this.state

    //     const number = window.prompt('Enter phone number (only numbers)')
    //     console.log(number)
    //     this.setState({text: {recipient: number}})
    //     this.sendText(number)
    // //    <button onClick={this.sendText}>Send Text</button>
    // }

    inputVal(input){
        this.setState({input: input})
    }

    setQuant(input, id, price, name, image, size, original_price){
        this.setState({input: ''})
        console.log('name ' + original_price)
        this.setState({quant: input})
        axios.put(`/api/cart/${name}`, {id:id ,quant: input, price: price, image: image, size: size, original_price: original_price})
        .then(res => {
            console.log(res.data)
            this.setState({cart2: res.data})
            console.log('cart: ' +this.state.cart2.price)
        })
        .catch(err => console.log(err + ' in setQuant'))
        window.location.reload(true)

    }

    email() {
        const email_add = 'foreverything005@gmail.com'
        // const email_add2 = 'foreverything005@gmail.com'

        axios.post('http://localhost:4200/email', {email_add})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log('error in email ' + err))
    }

    deleteItem(id){
        console.log(id)
        axios.delete(`/api/cart/${id}`)
        .then(res => {
            console.log(res.data)
            this.setState({cart2: res.data})
        })
        .catch(err => console.log(err + ' in deleteItem'))
        window.location.reload(true)
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
                <p>Size: {element.size}</p>
                <p>Price: ${element.price}</p>
                <input 
                type="text"
                placeholder="Quantity"
                 onChange={(event) => this.inputVal(event.target.value)}></input>
                <p>You selected: {element.quant} pair(s) of {element.name}</p>  
                
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
                    <h2 className = 'total'>{this.props.logg.loggedIn ? <div >
                        {/* <button onClick={this.checkOut}>Send message with TWILIO</button> */}
                        <h3 className='priceMapped'>Total: ${priceMapped}</h3>
                        <br />
                         <Message className='message' total = {priceMapped}/>                    
                    </div> 
                    :
                    null}</h2>
                    {/* <button onClick={this.email}>EMAIL</button> */}
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