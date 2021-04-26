import React, {Component} from 'react'
import {HashRouter} from 'react-router-dom';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'
import {getName} from './../ducks/fullNameReducer'
import axios from 'axios'
import {useState, useEffect} from 'react'


const Header = (props) => {


    const [name, setname] = useState([])


      useEffect( () =>{
        console.log('HEADER LOADED')
        axios.get('/auth/getUserData')
        .then(res => {
            if(res.data.x.first_name){
                console.log('user data ' + res.data.x.user_username)

                props.loginUser(res.data.x.user_username)

                let first_name = res.data.x.first_name
                let last_name = res.data.x.last_name
                let full_name = first_name + ' ' + last_name

                props.getName(full_name)

                setname('yes')

            }else{
                console.log('data not coming in!!!!')

            }
        }).catch(err=>{
            console.log('error in HELLO')
            setname('no')
           
        })

    }, [])
    
    function logout(){
        console.log('logout')
        axios.delete('/auth/logout')
        .then(res => {
            setname('no')
            props.logoutUser()
            console.log('logout in header ' + props.logg)
            props.history.push('/')
        }
        )
        .catch(err => console.log(err))
        // window.location.reload()   
     }


    
    function Hello(inp){
        console.log(inp)
   
         if(name === 'yes'){
            
            console.log('full name ' + props.giveMeName.name)
            return <div className='cart-header'>
            <p3 className='name'>Looking Good, {props.giveMeName.name}!</p3>
            <Link className='links' to='/'>
            <button className='logout-button' onClick={logout}>LogOut</button>
             </Link>
             <Link className='links' to = '/cart'>
             <img className = 'cart' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAAAkFBMVEX////NMwHLIADMKwDouq/JFADLIgD68u/vy8HYcVnosKfovLbWbVnov7borp/89vXXcV/67+n9+/jflITVYkfICADx0cfjppfy18/joZXWaE/biHvaemfXbFLXcFr14tvRTCjOOQDPQhrTWTjch3XbgmzntarPQRDagHHioZDRTzPSVj303tjVZUnWblvRTiw9OREAAAAEuklEQVR4nO3ca3eiMBAGYEwIXlbpQiu1rre1VrfWbf//v1urRLESNCwxE/o+39oD50zGAEmY4HkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBQHMe2Q7BgwIIU2xJH/Xvbod3eU9DIx79hMoZclYxftkO7PX5GJmNkO7Sbi9vD4Xjc7U4mk587o6FMxsR2bARM05sIf7AdCQGRvE5mtiMhIJbJ+G07Egrk4ySwHQgF8zQZ4juOQb96Tq8TEdmOhICxTMbGdiQELNJksJbtSAiQsxXWsx0JAR2ZjKXtSAjwWfpo7diOhIAW+75z+DMDkSbjxXYkBEQyGWPbkRAQy2Q8246EAjlTm/d8A5ZT2+3TspJTNWZCcGe7fVqeVcuiVQgebTdPT9dkMlZN283T88dgMoJX263TdG8wGdy1RZJX1Xul/xc4N6oNzSWDu/Uo8Y4zteq51zG8xFgyGu6tJE6FoVQ42DEO79SqT4ZjY4xPkalcLGy3rITm/HLDSiXDvTvGdg6/NpMLFzuG5z0YGYJyt+bu0thEMribHcMbmUgGc/GO4R3fqVXJ2eXlRwMDDUb5juGPfiq9Vd8zSHeMe3Fe5ndW8FehgPAr/cjU9EOBdB2lwYlpLka4Y3hx2dcA5a4g3rbd4EJ3vR9l+JNS2RCUHyX/4W+JbNS22LjMGIQNbEdtSImeUduOsaxDx4h6aok8aJD+Q30DnZTIBbmKfF8UPC7TDVjxpOig8k9WQaxjRIVjLL7evfN7MjMQ40Pbrf9iWZyMfbgGpmefWHIhuFtL+gWzsoDvx8p/WNHcrewsjlzH8LzOe1fpJR0eNhfqY1LvW92GVjpqXnQdrS6n4Ngx1rbDNUy5FTaHqHfH0Foi5W+2gzUs0rhnEN+ZEN+pxJcO2OutatMxnn4HKqvdgMCfKQ9IPx9wfb8g3jFeC9Y++cf2gJaocOjF57bbW6joZ90lo9KCWNodozAZ4nPnUZXJ2GWXsLAvVNiujjlhygO0LyDm227uBXFTRR6x/ys6N9Uto167VgCrQ7O8qd4b/po6k5K6f1igp7X6U++OkWj1i8ac8h2jed8+mrTlbLLTvtKD3lowo7wrNmoEJ+tV6bb/SWFpQvkVLj6nXDL/8uWH3Y8Oe8Yqo0PbDS4y+/LL7itUzW0toXzH2E7RTuaewX50OGAsf3J6SF3xHFalT3xbXivMWMo6xGmYT37YbZb5X+d6IemOoUteP3Vfz72K/IjGfKqczBSxHX61DqNN9SRWrU97tU9bq1+y6Gv3JtvRMnGVuyRJWvqS/WmOlokrbJahX6JFUS907CMIl7XetsMPFrxoPh834+1JjA1r1S8W6QJfoFdyE6alLNy1vf9FRodlC6GzJPF4mOY4uv8qT6awReerO4PMlI+bi+62Ttb2Vtefl637cXKbYp6TjfCzq0/bZKe/Lm7mzfUr8wtrbIw4qRqrzVJwdrOeuP71YHZhxMUt7/kylSg6JUjZnsHrcpV4/vGpoFPmvDkmQ+uBTFu8TrsG16vTG8nrRBBf5NISzbYjSc7Fg95OqngoPk9js3pVtMVhd/a80G+TP/pYj/xarfcBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAp/wArTlk7d2/EfQAAAABJRU5ErkJggg==' alt='images' />
             </Link>
            </div>
        }
        
        else if (name === 'no'){
            console.log('noooo')
            return <Link className='links' to='/account'>
            Login/Register
             </Link>
         }


        // if(props.logg.loggedIn === false){

        //     console.log('noooo')
        //     return <Link className='links' to='/account'>
        //     Login/Register
        //      </Link>
        // }else{
            
        //     console.log('full name ' + props.giveMeName.name)
        //     return <div className='cart-header'>
        //     <p3 className='name'>Looking Good, {props.giveMeName.name}!</p3>
        //     <Link className='links' to='/'>
        //     <button onClick={logout}>LogOut</button>
        //      </Link>
        //      <Link className='links' to = '/cart'>
        //      <img className = 'cart' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAAAkFBMVEX////NMwHLIADMKwDouq/JFADLIgD68u/vy8HYcVnosKfovLbWbVnov7borp/89vXXcV/67+n9+/jflITVYkfICADx0cfjppfy18/joZXWaE/biHvaemfXbFLXcFr14tvRTCjOOQDPQhrTWTjch3XbgmzntarPQRDagHHioZDRTzPSVj303tjVZUnWblvRTiw9OREAAAAEuklEQVR4nO3ca3eiMBAGYEwIXlbpQiu1rre1VrfWbf//v1urRLESNCwxE/o+39oD50zGAEmY4HkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBQHMe2Q7BgwIIU2xJH/Xvbod3eU9DIx79hMoZclYxftkO7PX5GJmNkO7Sbi9vD4Xjc7U4mk587o6FMxsR2bARM05sIf7AdCQGRvE5mtiMhIJbJ+G07Egrk4ySwHQgF8zQZ4juOQb96Tq8TEdmOhICxTMbGdiQELNJksJbtSAiQsxXWsx0JAR2ZjKXtSAjwWfpo7diOhIAW+75z+DMDkSbjxXYkBEQyGWPbkRAQy2Q8246EAjlTm/d8A5ZT2+3TspJTNWZCcGe7fVqeVcuiVQgebTdPT9dkMlZN283T88dgMoJX263TdG8wGdy1RZJX1Xul/xc4N6oNzSWDu/Uo8Y4zteq51zG8xFgyGu6tJE6FoVQ42DEO79SqT4ZjY4xPkalcLGy3rITm/HLDSiXDvTvGdg6/NpMLFzuG5z0YGYJyt+bu0thEMribHcMbmUgGc/GO4R3fqVXJ2eXlRwMDDUb5juGPfiq9Vd8zSHeMe3Fe5ndW8FehgPAr/cjU9EOBdB2lwYlpLka4Y3hx2dcA5a4g3rbd4EJ3vR9l+JNS2RCUHyX/4W+JbNS22LjMGIQNbEdtSImeUduOsaxDx4h6aok8aJD+Q30DnZTIBbmKfF8UPC7TDVjxpOig8k9WQaxjRIVjLL7evfN7MjMQ40Pbrf9iWZyMfbgGpmefWHIhuFtL+gWzsoDvx8p/WNHcrewsjlzH8LzOe1fpJR0eNhfqY1LvW92GVjpqXnQdrS6n4Ngx1rbDNUy5FTaHqHfH0Foi5W+2gzUs0rhnEN+ZEN+pxJcO2OutatMxnn4HKqvdgMCfKQ9IPx9wfb8g3jFeC9Y++cf2gJaocOjF57bbW6joZ90lo9KCWNodozAZ4nPnUZXJ2GWXsLAvVNiujjlhygO0LyDm227uBXFTRR6x/ys6N9Uto167VgCrQ7O8qd4b/po6k5K6f1igp7X6U++OkWj1i8ac8h2jed8+mrTlbLLTvtKD3lowo7wrNmoEJ+tV6bb/SWFpQvkVLj6nXDL/8uWH3Y8Oe8Yqo0PbDS4y+/LL7itUzW0toXzH2E7RTuaewX50OGAsf3J6SF3xHFalT3xbXivMWMo6xGmYT37YbZb5X+d6IemOoUteP3Vfz72K/IjGfKqczBSxHX61DqNN9SRWrU97tU9bq1+y6Gv3JtvRMnGVuyRJWvqS/WmOlokrbJahX6JFUS907CMIl7XetsMPFrxoPh834+1JjA1r1S8W6QJfoFdyE6alLNy1vf9FRodlC6GzJPF4mOY4uv8qT6awReerO4PMlI+bi+62Ttb2Vtefl637cXKbYp6TjfCzq0/bZKe/Lm7mzfUr8wtrbIw4qRqrzVJwdrOeuP71YHZhxMUt7/kylSg6JUjZnsHrcpV4/vGpoFPmvDkmQ+uBTFu8TrsG16vTG8nrRBBf5NISzbYjSc7Fg95OqngoPk9js3pVtMVhd/a80G+TP/pYj/xarfcBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAp/wArTlk7d2/EfQAAAABJRU5ErkJggg==' alt='images' />
        //      </Link>
        //     </div>
        // }





        // }else{
        //     return <div>
        //         <h5>Logged In!</h5>,
        //         <button onClick={this.logout}>LogOut</button>
        //     </div>
        // }
    }
    

    //      https://img.favpng.com/1/0/19/shopping-cart-logo-grocery-store-png-favpng-Ch95Hxwf72xDpPbZbmv87T8m8.jpg

    // render(){
        return(
            <HashRouter>

            <div className='full-header'>


            <div className='Header'>
    
            <Link to='/'> <img className='logo' src='https://pbs.twimg.com/profile_images/671849180348948480/o1w5XUTr_400x400.jpg' alt='logo'/>
            </Link >
            {/* <h1 id='title'>GENERIC APP NAME</h1> */}
             {Hello('yes')}
            
            </div>

            <nav>
    
                <Link className='links' to='/'>
                    Home
                </Link >

                <Link className='links' to='/all-shoes'>
                All Shoes
                </Link>
    
                <Link className='links' to='/nikes'>
                    Nikes
                </Link>
    
                <Link className='links' to = '/adidas'>
                    Adidas
                </Link>
    
                <Link className='links' to = '/air-jordans'>
                    Air Jordans
                </Link>
                
    
                {/* <div>
                <Link className='links' to='/login'>
                <button >Login</button>
                </Link>
            </div> */}
                </nav>
            <h2 className='black-banner'>
               <p1>THE ONLY PLACE FOR YOUR SHOE NEEDS</p1> 
            </h2>
            </div>
    
            </HashRouter>
        )
}




function mapStateToProps(state) {

    return({ 
      logg: state.logg,
      giveMeName: state.giveMeName
    })
  }
  
  export default connect(mapStateToProps, { loginUser, logoutUser, getName })(Header)