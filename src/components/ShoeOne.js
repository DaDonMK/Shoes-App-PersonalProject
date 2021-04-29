import React, {Component} from 'react'
import axios from 'axios'
import Cart from './Cart'
import Header from './Header'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

class NikeOne extends Component{
    constructor(){
        super()

        this.state = {
            shoe: [],
            size: 0,
            shoe_id: 0,
            shoe_image: '',
            shoe_name: '',
            shoe_price: 0,
            shoe_quant: 0,
            shoe_original_price: 0,
            cart : []
        }

        this.setSize = this.setSize.bind(this)
        this.sendToCart = this.sendToCart.bind(this)
        // this.disabledButton = this.disabledButton.bind(this)

    }

    componentDidMount(){
        axios.get(`/api/shoe/${this.props.match.params.id}`)
            .then(res => {
                this.setState({shoe: res.data})
                console.log('shoe ' + this.state.shoe)
            })
    }

   setSize(input){
       console.log('setsize ' + this.state.shoe[0].size)
    if(this.state.shoe[0].size.includes(input)){
        this.setState({size: input})
        this.setState({shoe_size: input})
        this.setState({shoe_id: this.state.shoe[0].id})
        this.setState({shoe_image: this.state.shoe[0].image})
        this.setState({shoe_name: this.state.shoe[0].shoe_name})
        this.setState({shoe_price: this.state.shoe[0].price})
        this.setState({shoe_quant: this.state.shoe[0].quantity})
        this.setState({shoe_original_price: this.state.shoe[0].original_price})


        // console.log(this.state.shoe)

    }else{
        toast.error(`Size ${input} is Out of Stock`)
        // window.alert(`Size ${input} is Out of Stock`)
    }
   }

   sendToCart(){
        toast.success( 'Sent to cart!')

       let random = {
        id: this.state.shoe_id,
        name: this.state.shoe_name,
        image: this.state.shoe_image,
        price: this.state.shoe_price,
        size: this.state.size,
        quant: this.state.shoe_quant,
        original_price: this.state.shoe_original_price
       }
       console.log(random)
    //    window.alert('"'+this.state.shoe_name+'"' + ' sent to cart!')
    //    this.setState({cart: 8})
    axios.post('/api/cart', { id: random.id, name: random.name, image: random.image, price: random.price, size: random.size, quant: random.quant, original_price: random.original_price})
    .then(res => {
        console.log(res.data)
        this.setState({cart: res.data})
        console.log('cart: ' + res.data)

    })
    .catch(err => console.log(err + 'inSendToCart'))
   }

   disabledButton(price){
       console.log()
       if(this.props.logg.loggedIn === true){
           return <button  onClick={() => this.sendToCart()}>$ {price}.00</button>
       }else{
            return <h5>Log In to Send to Cart</h5>
       }

   }

    render(){
        let shoeMap = this.state.shoe.map((element, i) => {
            console.log(element.alt_image)
            return <div className='shoeOne' key={i}>
            <div className='shoeOneimages'>
                <h4 className='one-shoe-name'>{element.shoe_name}</h4>
                <img className = 'one-images' src={element.image} alt='images' />
                {/* <h4>{element.alt_image[1]}</h4> */}
                <img className = 'one-images' src={element.alt_image[0]} alt='images' />
                <img className = 'one-images' src={element.alt_image[1]} alt='images' />
                <img className = 'one-images' src={element.alt_image[2]} alt='images' />  
            </div>

            <div className='shoeOnebuttons'>
                {/* <button  onClick={() => this.setSize(6)}>6</button>
                <button  onClick={() => this.setSize(7)}>7</button>
                <button onClick={() => this.setSize(8)}>8</button>
                <button  onClick={() => this.setSize(9)}>9</button>
                <button  onClick={() => this.setSize(10)}>10</button>
                <button  onClick={() => this.setSize(11)}>11</button>
                <button  onClick={() => this.setSize(12)}>12</button>
                <button onClick={() => this.setSize(13)}>13</button>
                <button  onClick={() => this.setSize(14)}>14</button>
                <button  onClick={() => this.setSize(15)}>15</button>
                <button  onClick={() => this.setSize(16)}>16</button>
                <button  onClick={() => this.setSize(17)}>17</button>
                <button  onClick={() => this.setSize(18)}>18</button> */}
                <p id='size'>Sizes:</p>
                {/* <br></br> */}
                <button className='size-buttons' onClick={() => this.setSize(3)}>3</button>
                <button className='size-buttons' onClick={() => this.setSize(3.5)}>3.5</button>
                <button className='size-buttons' onClick={() => this.setSize(4)}>4</button>
                <button className='size-buttons' onClick={() => this.setSize(4.5)}>4.5</button>
                <button className='size-buttons' onClick={() => this.setSize(5)}>5</button>
                <button className='size-buttons' onClick={() => this.setSize(5.5)}>5.5</button>
                <button className='size-buttons' onClick={() => this.setSize(6)}>6</button>
                <button className='size-buttons' onClick={() => this.setSize(6.5)}>6.5</button>
                <button className='size-buttons' onClick={() => this.setSize(7)}>7</button>
                <button className='size-buttons' onClick={() => this.setSize(7.5)}>7.5</button>
                <button className='size-buttons' onClick={() => this.setSize(8)}>8</button>
                <button className='size-buttons' onClick={() => this.setSize(8.5)}>8.5</button>
                <button className='size-buttons' onClick={() => this.setSize(9)}>9</button>
                <button className='size-buttons' onClick={() => this.setSize(9.5)}>9.5</button>
                <button className='size-buttons' onClick={() => this.setSize(10)}>10</button>
                <button className='size-buttons' onClick={() => this.setSize(10.5)}>10.5</button>
                <button className='size-buttons' onClick={() => this.setSize(11)}>11</button>
                <button className='size-buttons' onClick={() => this.setSize(11.5)}>11.5</button>
                <button className='size-buttons' onClick={() => this.setSize(12)}>12</button>
                <button className='size-buttons' onClick={() => this.setSize(12.5)}>12.5</button>
                <button className='size-buttons' onClick={() => this.setSize(13)}>13</button>
                <button className='size-buttons' onClick={() => this.setSize(13.5)}>13.5</button>
                <button className='size-buttons' onClick={() => this.setSize(14)}>14</button>
                <button className='size-buttons' onClick={() => this.setSize(14.5)}>14.5</button>
                <button className='size-buttons' onClick={() => this.setSize(15)}>15</button>
                <button className='size-buttons' onClick={() => this.setSize(15.5)}>15.5</button>
                <button className='size-buttons' onClick={() => this.setSize(16)}>16</button>
                <button className='size-buttons' onClick={() => this.setSize(16.5)}>16.5</button>
                <button className='size-buttons' onClick={() => this.setSize(17)}>17</button>
                <button className='size-buttons' onClick={() => this.setSize(18)}>18</button>
                <button  onClick={() => this.sendToCart()}>$ {element.price}.00</button>           
                 </div>
 
            </div>

        })
        
        
        return(
            <div>
                <Header />
                {shoeMap}
                {this.state.size}
                {/* {this.state.shoe_name} */}
                {/* <Cart 
                size={this.state.shoe_size}
                name={this.state.shoe_name}
                id={this.state.shoe_id}
                image={this.state.shoe_image}
                price={this.state.shoe_price}
                /> */}
            </div>
        )
    }

}

function mapStateToProps(state) {

    return({ 
      logg: state.logg
    })
  }
  
  export default connect(mapStateToProps, { loginUser, logoutUser })(NikeOne)