import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser, logoutUser} from './../ducks/loggedInReducer'
import {getName} from './../ducks/fullNameReducer'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class Auth extends Component{

    constructor(){
        super()

        this.state = {
            user: {},
            name: '',
            username: '',
            password: '',
            loggedIn: false
        }
        // this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.usernameInput = this.usernameInput.bind(this)
        this.passwordInput = this.passwordInput.bind(this)
    }

    usernameInput(inp){
        this.setState({ username: inp });
    }

    passwordInput(inp){
        this.setState({ password: inp });
    }


     login(){
        const {username, password} = this.state
        axios.post('/auth/login', {username, password})
        .then(res => {
            this.setState({username: '', password: '', user: res.data})
            console.log('login name: ' + username)
            // console.log('username ' + username)
            this.props.loginUser(username)
            // this.props.getLoginName()
            // let d = {username: username}
            // console.log(d)
          let first_name = ''
          let last_name = ''
          let full_name = ''
            axios.get('auth/getUserData')
            .then(res => {
              // this.setState({first_name: res.data.x.first_name})
              first_name = res.data.x.first_name
              last_name = res.data.x.last_name
              full_name = first_name + ' ' + last_name
              // console.log('data: ' + this.state.first_name)
              console.log('original data: ' + full_name)

              this.props.getName(full_name)
              console.log(this.props.giveMeName.name)


            })


            this.props.history.push('/')
            // console.log(this.props.logg)
          // let user2 = username
            
          })
          .catch(err => {
            toast.error(err.response.request.response.toUpperCase())
            this.setState({ username: "", password: "" });
            // alert(err.response.request.response);
          })
    }

    logout(){
        axios.delete('/auth/logout')
        .then( res => {
          // console.log('logout res ' + res)
          this.setState({ user: ''})
          this.props.logoutUser()
          console.log(this.props.logg)
          }
        )
        .catch(err => console.log(err))

    }

    render(){
      console.log(this.props.logg)
        const { username, password, user } = this.state;
        return(
            <div className='Login'>
              <ToastContainer />
        <div className="title">Login</div>
        {user.username ? (
          <div className="Welcome">
            <h4>{user.username}, welcome to app</h4>

           <Link to='/cart'>Cart</Link>  
           

            <button type="submit" onClick={this.logout}>
              Logout
            </button>

            {/* <Link to='/'><button type="submit" onClick={this.logout}>
              Logout
            </button></Link> */}
          </div>
        ) : (
          <div className="loginContainer">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => this.usernameInput(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => this.passwordInput(e.target.value)}
            />
            <button onClick={this.login}>Log In</button>
            {/* <button onClick={this.register} id="reg">
              Register
            </button> */}
          </div>
        )}
        {/* <h2>{this.props.reduxState.loggedInReducer}</h2> */}
      </div>
        )
    }
}
// const mapStateToProps = reduxState => {
//   // console.log(reduxState)
//   return reduxState;
// }

function mapStateToProps(state) {

  return({ 
    logg: state.logg,
    giveMeName: state.giveMeName
  })
}

export default connect(mapStateToProps, { loginUser, logoutUser, getName })(Auth)