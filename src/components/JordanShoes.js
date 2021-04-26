import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Header from './Header'
import {useState, useEffect} from 'react'

// export default class AdidasShoes extends Component{
const JordanShoes = (props) => {

    // constructor(){
    //     super()

    //     this.state = {
    //         adidas : []
    //     }
    // }

    const [jordans, setjordans] = useState([])


    // componentDidMount(){
    //     axios.get('/api/shoes')
    //     .then(res => {
    //       this.setState({adidas: res.data})
    //       console.log('nikes ' + this.state.adidas)
    //     })
    //     .catch
    //     (err=> console.log(err))
    // }


    function popSort(){
        axios.get(`/api/popular/jordans`)
            .then(res => {
                setjordans(res.data)
                // console.log('popularity sort ' )
            })
            .catch
                (err=> console.log(err))
    }

    function nameSort(){
        axios.get(`/api/name/jordans`)
            .then(res => {
                setjordans(res.data)
                // console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }

    function highToLow(){
        axios.get(`/api/price-high-low/jordans`)
            .then(res => {
                setjordans(res.data)
                // console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }

    function lowToHigh(){
        axios.get(`/api/price-low-high/jordans`)
            .then(res => {
                setjordans(res.data)
                // console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }


    useEffect(() => {
    axios.get('/api/shoes')
        .then(res => {
        //   this.setState({adidas: res.data})
        setjordans(res.data)
          console.log('jordans ' + jordans)
        })
        .catch
        (err=> console.log(err))

    }, [])

    // https://freight.cargo.site/t/original/i/4bf8c27823584c9f9cf695066ba822f73a4877105f05a2c7c15366da2c410160/09f9efc755054310966c23231c5a51be.gif
    let jordansMapped = jordans.map((element, i) => {
            if(element.brand === 'jordans'){
                return <div className='shoes-display' key={i}>
                <h7 className='brand-text'>{element.brand}</h7>
                <Link to={`/shoe/${element.id}`}><img className = 'shoe-images' src={element.image} alt='images' /></Link> 
                <h5 className='shoe-name'>{element.shoe_name}</h5>
            </div> 
            }
        })
    return(

        <div>


        <div>
                 <Header />
                <div className='jordans-square'>

                <img className='jordans-wallpaper' src='https://i.gifer.com/Zj1Y.gif' alt='adidasgif'></img>
                </div>


        </div>




            <div className='jordans-body'>

                <p1>Sort by:</p1>
                <button className="sort" onClick={popSort}>Popularity</button>
                <button className="sort" onClick={nameSort}>Name</button>
                <button className="sort" onClick={highToLow}>Price (Highest-Lowest)</button>
                <button className="sort" onClick={lowToHigh}>Price (Lowest-Highest)</button>
                <h2 className='shoes-map'>{jordansMapped}</h2>
                {/* <h1>{jordansMapped}</h1> */}
            </div>
        </div>



        )
    
}

export default JordanShoes


// import React, {Component} from 'react'
// import axios from 'axios'
// import {Link} from 'react-router-dom'
// import Header from './Header'

// export default class JordanShoes extends Component{

//     constructor(){
//         super()

//         this.state = {
//             jordans: []
//         }
//     }

//     componentDidMount(){
//         axios.get('/api/shoes')
//         .then(res => {
//             this.setState({jordans: res.data})
//             console.log('jordan object: ' + this.state.jordans)
//         }).catch(
//             err => console.log(err)
//         )
//     }

//     render(){
//         let jordansMapped = this.state.jordans.map((element, i) => {
//             if(element.brand === 'jordans'){
//                 return <div key={i}>
//                 <Link to={`/shoe/${element.id}`}><img className = 'shoe-images' src={element.image} alt='images' /></Link> 
//                 <h4>{element.shoe_name}</h4>
//                 <h4>{element.id}</h4>
//             </div> 
//             }
//         })
//         return(
//             <div>

//                 <Header />
    
//                 <div>{jordansMapped}</div>
//             </div>
//         )
//     }
// }