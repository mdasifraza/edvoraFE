import { useContext, useState } from "react";
import {Redirect} from 'react-router-dom'
import Store from "../Store";

const Login = ({history}) => {
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const [err,setError]=useState({msg:''})
    const {dispatch}=useContext(Store)
    const SUBMIT=(e)=>{
        e.preventDefault()
        fetch('/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(d=>d.json()).then(d=>{
            if(Object.keys(d.err).length>0){
                setError({...d.err})
            }
            else{
                dispatch({
                  type:'GetToken',
                  payload:d.data[0]
                })
            }
        }).catch(e=>{
            dispatch({
              type:'RemoveToken'
            })
        })
    }
   
    return(
  <>
  {localStorage.getItem('Token')===null?
    <div className="container"style={{position:'fixed', top:'50%',left:'50%',transform:'translate(-50%, -50%)',width:'60vw'}} >
      <form onSubmit={SUBMIT}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            onChange={((e)=>{setEmail(e.target.value)
                setError({msg:''})
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            minLength="3"
            required
            onChange={((e)=>{
                setPassword(e.target.value)
                setError({msg:''})
            })}
          />
        </div >
        <div className="mb-3" style={{color:'red' , textAlign:'center'}}>
            {err.msg} 
        </div >
        <div style={{ display:'flex',justifyContent:'center'}}>
        <button  type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
:<Redirect to = '/'></Redirect>}
  </>
)
};
export default Login
