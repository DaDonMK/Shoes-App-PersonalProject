import axios from 'axios'

const initialState = {
    name: ''
}

const GET_NAME = 'GET_NAME'

export function getName(name){
    return{
        type: GET_NAME,
        payload: name
    }
}

// export function getLoginName(){
//     return{
//         type: GET_NAME,
//         payload: axios.get('/auth/login')
//     }
// }

export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_NAME:
            return{
                name: action.payload
            }
    default: return state;

    }
}