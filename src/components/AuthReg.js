import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'
import {getName} from './../ducks/fullNameReducer'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class AuthReg extends Component{

    constructor(){
        super()

        this.state = {
            user: {},
            userName: {},
            name: '',
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            loggedIn: false,
            fullName: ''
        }

        this.usernameInput=this.usernameInput.bind(this)
        this.passwordInput=this.passwordInput.bind(this)
        this.register=this.register.bind(this)
        this.firstName=this.firstName.bind(this)
        this.lastName=this.lastName.bind(this)
        // this.check=this.check.bind(this)
    }

    // check(){
    //   axios.get('/auth/getUserData')
    //         .then(res => {
    //           console.log('getUserData ' + res.data)
             

    //         })
    //         .catch(err => {
    //           console.log('ERROR IN GET USERDATA')
    //         })
    // }

    usernameInput(inp){
        this.setState({ username: inp });
    }

    passwordInput(inp){
        this.setState({ password: inp });
    }

    firstName(inp){
      this.setState({first_name: inp})
    }

    lastName(inp){
      this.setState({last_name: inp})
    }
    
     async register(){
        const { username, password, first_name, last_name } = this.state
        let res = await axios.post('/auth/register', {username, password, first_name, last_name})

        this.setState({ username: username, password: password, user: res.data.newUser, userName: res.data.newUser2, first_name: res.data.newUser2.first_name, last_name: res.data.newUser2.last_name});
        this.props.loginUser(username)
        this.setState({fullName: this.state.first_name + ' ' + this.state.last_name})
        this.props.getName(this.state.fullName)
        console.log('full name from register: ' + this.props.giveMeName.name)
        
        this.props.history.push('/')

        // .then(res => {
          // console.log(res.data)
          // this.setState({ username: username, password: password, user: res.data.newUser, userName: res.data.newUser2, first_name: res.data.newUser2.first_name, last_name: res.data.newUser2.last_name});
          
          // let fullName = this.state.first_name + ' ' + this.state.last_name
          
          

        // })
        // .catch(err => {
        //   console.log('it dont')
        //   this.setState({ username: '', password: '' });
        //   toast.error(err.response.request.response.toUpperCase())
        // })
      
  // console.log('async bb')        
      }

    //  register(){
    //   const { username, password, first_name, last_name } = this.state
    //   axios.post('/auth/register', {username, password, first_name, last_name})
    //   .then(res => {
    //     console.log(res.data)
    //     this.setState({ username: username, password: password, user: res.data.newUser, userName: res.data.newUser2, first_name: res.data.newUser2.first_name, last_name: res.data.newUser2.last_name});
    //     this.props.loginUser(username)
        
    //     this.setState({fullName: this.state.first_name + ' ' + this.state.last_name})
    //     // let fullName = this.state.first_name + ' ' + this.state.last_name
        
    //     this.props.getName(this.state.fullName)
        
    //     console.log('full name from register: ' + this.props.giveMeName.name)
    //   })
    //   .catch(err => {
    //     console.log('it dont')
        
        
        
    //     this.setState({ username: '', password: '' });
        
        
    //     toast.error(err.response.request.response.toUpperCase())
        
    //     // alert(err.response.request.response);
    //   });
      
    //   this.props.history.push('/adidas')
    // }


    render(){
        return(
            <div className="loginContainer">
              <ToastContainer />
                <div className="title">Register</div>

            <form className='form' onSubmit={this.register}>
              <label>
              <label>
                First Name: 
                <input type='text' placeholder="First Name" value={this.state.first_name} onChange={e => this.firstName(e.target.value)}/>
              </label>
              <label>
                Last Name: 
                <input type='text' placeholder="Last Name" value={this.state.last_name} onChange={e => this.lastName(e.target.value)}/>
              </label>
                Username:
                <input type='text' placeholder="Username" value={this.state.username} onChange={e => this.usernameInput(e.target.value)} />
              </label>
              <label>
                Password: 
                <input type='password' placeholder="Password" value={this.state.password} onChange={e => this.passwordInput(e.target.value)}/>
              </label>
              <input type="submit" value="Submit" />
            </form>
            {/* <button onClick={this.check}>Check</button> */}

            {/* <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.usernameInput(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.passwordInput(e.target.value)}
            /> */}
            {/* <button onClick={this.login}>Register</button> */}
            {/* <button onClick={this.register} id="reg">
              Register
            </button> */}
          </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//   return{
//     giveMeName: (name) => {dispatch({type: 'GET_NAME', name: name})}
//   }
// }

function mapStateToProps(state) {

    return({ 
      logg: state.logg,
      giveMeName: state.giveMeName
    })
  }
  
  export default connect(mapStateToProps, { loginUser, logoutUser, getName })(AuthReg)