import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Header from './Header'

export default class Home extends Component{
    constructor(){
        super()
    
        this.state ={
          all_shoes : []
        }

        // this.popular=this.popular.bind(this)
        // this.highToLow=this.highToLow.bind(this)
        // this.lowToHigh=this.lowToHigh.bind(this)
        // this.nameSort=this.nameSort.bind(this)
      }

      // nameSort(){
      //   axios.get('/api/name')
      //   .then(res => {
      //     this.setState({all_shoes: res.data})
      //     console.log('popular shoes ' + this.state.all_shoes)
      //   })
      //   .catch
      //   (err=> console.log(err))
      // }

      // popular(){
      //   axios.get('/api/popularShoe')
      //   .then(res => {
      //     this.setState({all_shoes: res.data})
      //     console.log('popular shoes ' + this.state.all_shoes)
      //   })
      //   .catch
      //   (err=> console.log(err))
      // }

      // highToLow(){
      //   axios.get('/api/high-low')
      //   .then(res => {
      //     this.setState({all_shoes: res.data})
      //     console.log('popular shoes ' + this.state.all_shoes)
      //   })
      //   .catch
      //   (err=> console.log(err))
      // }

      // lowToHigh(){
      //   axios.get('/api/low-high')
      //   .then(res => {
      //     this.setState({all_shoes: res.data})
      //     console.log('popular shoes ' + this.state.all_shoes)
      //   })
      //   .catch
      //   (err=> console.log(err))
      // }

      componentDidMount(){
        axios.get('/api/new')
        .then(res => {
          this.setState({all_shoes: res.data})
          console.log(this.state.all_shoes)
        })
        .catch
        (err=> console.log(err))
      }

      // componentDidMount(){
      //   axios.get('/api/shoes')
      //   .then(res => {
      //     this.setState({all_shoes: res.data})
      //     console.log(this.state.all_shoes)
      //   })
      //   .catch
      //   (err=> console.log(err))
      // }

    render(){
      console.log(this.props.logg)
        let mappedData = this.state.all_shoes.map((element, i) => {
            return <div className='shoes-display' key={i}>
              
            <h5 className='brand-text'>{element.brand.toUpperCase()}</h5>
            <Link to={`/shoe/${element.id}`}><img className = 'shoe-images' src={element.image} alt='images' /></Link> 
            <h5 className='shoe-name'>{element.shoe_name}</h5>
            <h7 className='brand-text'>$ {element.price}.00</h7>

            </div> 
        })
        console.log(mappedData)

        return(
          <div>
              <Header /> 
                 <div className='Home'>
                 <Link to={'/shoe/11'}><img className = 'wallpaper' src='https://i.imgur.com/3FJqCLX.png' alt='images' /></Link>
                 </div>
                 {/* <div>
                 <h5>Sort by:</h5>
                 <button className="sort" onClick={this.popular}>Popularity</button>
                 <button className="sort" onClick={this.highToLow}>Price (Highest-Lowest)</button>
                 <button className="sort" onClick={this.lowToHigh}>Price (Lowest-Highest)</button>
                 <button className="sort" onClick={this.nameSort}>Name</button>
                 </div> */}

                <h2 className='new-release'>NEW RELEASES</h2>
                <div className='grey'>

                <h2 className='shoes-map'>{mappedData}</h2>
                </div>
                {/* <h2>{this.props.logg}</h2> */}
            </div>
        )
    }
}