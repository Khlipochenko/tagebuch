import { useState } from "react"
import { FaEye } from "react-icons/fa";
export const LoginUser=()=>{
    const[state, setState]=useState('login')
    return(<>


        <div>
        {state==='login'&&
        <div>
            <form >
  <label for="email"> Email
<input  id="email" name="email" type="email" placeholder="exaple@gmail.com"/></label>
<label for="password">Paaswort
<div><input  id="password" name="password" type="password" placeholder=""/><FaEye /></div></label>

<button type="onsubmit">Login</button>
            </form>
            
</div>}

        </div>
    </>)
}