
const initialState = {
    username: '',
    loggedIn:false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'


export function loginUser(usernameStr) {
  console.log(usernameStr)
  return {
      type: LOGIN_USER,
      payload: usernameStr
  }
}

export function logoutUser() {
  return {
      type: LOGOUT_USER
  }
}

export default function reducer(state = initialState, action) {
    switch(action.type){
    case LOGIN_USER:
      return { 
        username: action.payload,
        loggedIn: true}
    case LOGOUT_USER:
          return initialState;
    default: return state;

    }
}
