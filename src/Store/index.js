import { createContext, useReducer } from "react";
const initialState=''
const Reducer=(state,action)=>{
    state=state||initialState

    switch (action.type) {
        case 'GetToken':
            localStorage.setItem('Token',action.payload)
            return action.payload
        case 'RemoveToken':
            localStorage.removeItem('Token')
            return ''
        default:
            return state
    }

}

const Store=createContext({})


export const Layout=({children})=>{
    const [Token,dispatch]=useReducer(Reducer,initialState)
    return(
        <>
        <Store.Provider value={{Token,dispatch}}>
            {children}
        </Store.Provider>
        </>
    )
}

export default Store