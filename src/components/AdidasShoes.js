import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Header from './Header'
import {useState, useEffect} from 'react'

// export default class AdidasShoes extends Component{
const AdidasShoes = (props) => {

    // constructor(){
    //     super()

    //     this.state = {
    //         adidas : []
    //     }
    // }

    const [adidas, setadidas] = useState([])


    function popSort(){
        axios.get(`/api/popular/adidas`)
            .then(res => {
                setadidas(res.data)
                // console.log('popularity sort ' )
            })
            .catch
                (err=> console.log(err))
    }

    function nameSort(){
        axios.get(`/api/name/adidas`)
            .then(res => {
                setadidas(res.data)
                // console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }

    function highToLow(){
        axios.get(`/api/price-high-low/adidas`)
            .then(res => {
                setadidas(res.data)
                // console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }

    function lowToHigh(){
        axios.get(`/api/price-low-high/adidas`)
            .then(res => {
                setadidas(res.data)
                // console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }
    // componentDidMount(){
    //     axios.get('/api/shoes')
    //     .then(res => {
    //       this.setState({adidas: res.data})
    //       console.log('nikes ' + this.state.adidas)
    //     })
    //     .catch
    //     (err=> console.log(err))
    // }

    useEffect(() => {
    axios.get('/api/shoes')
        .then(res => {
        //   this.setState({adidas: res.data})
        setadidas(res.data)
          console.log('adidas ' + adidas)
        })
        .catch
        (err=> console.log(err))

    }, [])

   
    let adidasMapped = adidas.map((element, i) => {
            if(element.brand === 'adidas'){
                return <div className='shoes-display' key={i}>
                <h7 className='brand-text'>{element.brand}</h7>
                <Link to={`/shoe/${element.id}`}><img className = 'shoe-images' src={element.image} alt='images' /></Link> 
                <h5 className='shoe-name'>{element.shoe_name}</h5>
            </div> 
            }
        })

        // https://media.gq.com/photos/5efb7af47b6ab974cf831f7f/master/pass/yeezy-2.gif
    return(

        <div>

            <div>

                <Header />
                <div className='adidas-square'>

                <img className='adidas-wallpaper' src='https://i.pinimg.com/originals/3c/8a/63/3c8a635b2de5869ec701efbb91e8ffdc.gif' alt='adidasgif'></img>
                </div>
            </div>


            <div className='adidas-body'>
                

                
                <p1>Sort by:</p1>
                <button className="sort" onClick={popSort}>Popularity</button>
                <button className="sort" onClick={nameSort}>Name</button>
                <button className="sort" onClick={highToLow}>Price (Highest-Lowest)</button>
                <button className="sort" onClick={lowToHigh}>Price (Lowest-Highest)</button>
                <div className='grey'>
                <h2 className='shoes-map'>{adidasMapped}</h2>
                </div>      
            </div>


        </div>


        )
    
}

export default AdidasShoes