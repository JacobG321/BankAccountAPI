import {createContext,useReducer} from 'react'
import axios from 'axios'


const CustomerContext = createContext()

const initialState = {customer:null}

const reducer = (state,action)=>{
    switch(action.type){
        case "SET_CUSTOMER":
            return{
                ...state,
                customer:action.payload
            }
        case "NULL_CUSTOMER":
            return{
                ...state,
                customer:null
            }
        case"LOGOUT_CUSTOMER":
            console.log("top of Logout")

            axios.get('http://localhost:8000/api/logout',{withCredentials:true})
            .then(()=>{
                action.payload('/')
            })
            .catch(()=>{
                action.payload('/accounts')
            })
            return{
                ...state,
                customer:null
            }
        default:
            return state
    }

}

const CustomerContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <CustomerContext.Provider value={{state,dispatch}}>
        {children}
    </CustomerContext.Provider>
  )
}

export {CustomerContextProvider,CustomerContext}