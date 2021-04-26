import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Header from './Header'
import {useState, useEffect} from 'react'

// export default class AdidasShoes extends Component{
const NikeShoes = (props) => {

    // constructor(){
    //     super()

    //     this.state = {
    //         adidas : []
    //     }
    // }

    const [nikes, setnikes] = useState([])


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
        axios.get(`/api/popular/nike`)
            .then(res => {
                setnikes(res.data)
                console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }

    function nameSort(){
        axios.get(`/api/name/nike`)
            .then(res => {
                setnikes(res.data)
                console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }

    function highToLow(){
        axios.get(`/api/price-high-low/nike`)
            .then(res => {
                setnikes(res.data)
                console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }

    function lowToHigh(){
        axios.get(`/api/price-low-high/nike`)
            .then(res => {
                setnikes(res.data)
                console.log('popularity sort ' + nikes)
            })
            .catch
                (err=> console.log(err))
    }

    useEffect(() => {
    axios.get('/api/shoes')
        .then(res => {
        //   this.setState({adidas: res.data})
        setnikes(res.data)
        //   console.log('nikes ' + nikes)
        })
        .catch
        (err=> console.log(err))

    }, [])

   //  https://cdn.dribbble.com/users/2747136/screenshots/9554087/media/ea604c999fb8cd5d0577cdf4caa09dfa.gif

    let nikesMapped = nikes.map((element, i) => {
            if(element.brand === 'nike'){
                return <div className='shoes-display' key={i}>
                <Link to={`/shoe/${element.id}`}><img className = 'shoe-images' src={element.image} alt='images' /></Link> 
                <h5 className='shoe-name'>{element.shoe_name}</h5>

            </div> 
            }
        })
        return(
            <div>

                <div>

                        <Header />
                    <div className='nikes-square'>

                            <img className='nikes-wallpaper' src='https://i.pinimg.com/originals/c6/3e/c4/c63ec47dc875a59d88469841a60068de.gif' alt='nikesgif'></img>
                    </div>
                </div>




                <div className='nikes-body'>

                        <p1>Sort by:</p1>
                        <button className="sort" onClick={popSort}>Popularity</button>
                        <button className="sort" onClick={nameSort}>Name</button>
                        <button className="sort" onClick={highToLow}>Price (Highest-Lowest)</button>
                        <button className="sort" onClick={lowToHigh}>Price (Lowest-Highest)</button>
                    <div className='grey'>

                    <h2 className='shoes-map'>{nikesMapped}</h2>
                    </div>
            </div>
            </div>
        )
    
}

export default NikeShoes

// import React, {Component} from 'react'
// import axios from 'axios'

// export default class NikeShoes extends Component{

//     constructor(){
//         super()

//         this.state = {
//             nikes : []
//         }
//     }

//     componentDidMount(){
//         axios.get(`api/shoes/${this.props.match.params.brand}`)
//         .then(res => {
//           this.setState({nikes: res.data})
//           console.log(this.state.nikes)
//         })
//         .catch
//         (err=> console.log(err))
//     }

//     render(){
//         let mappedShoes = this.state.nikes.map((element, i) => {
//             return <div>
//                 <h3 key = {i}>
//                 {element.brand}
//                 {element.shoe_name}
//                 </h3>
//                 <img className = 'shoe-images' src={element.image} alt='images' />
//             </div>
//         })
//         console.log(this.state.nikes)
//         return(
//             <div>
//                 <h1>{this.props.match.params.brand}</h1>
//                 <h1>{mappedShoes}</h1>
//             </div>
//         )
//     }
// }


