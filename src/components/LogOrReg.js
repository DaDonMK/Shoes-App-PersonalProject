import React from 'react'
import {Link} from 'react-router-dom'

const LogOrReg = () => {

    return(
        <div className='logreg1'>

         <div className='logreg2'>
            <Link to='/login'><button className='logButton1'>LOGIN</button></Link> 
            <Link to='/register'><button className='logButton'>REGISTER</button></Link> 
        </div>
        </div>
        )
}

export default LogOrReg