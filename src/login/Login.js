import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HandleLogin } from "../fetching/Fetching"
import "./login.css"


export const Login = () => {
    const [userName, setUserName] = useState("")
    // const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        HandleLogin(userName)
        .then(() => {return navigate("/")})
    }

    return (<>
        <section className="login">
            <h4>There's supposed to be some login fields here</h4>
            <h5>Sucks to be you huh?</h5>
            <h6>Yeah it does.</h6>
            <form>
                <fieldset>
                    <input autoFocus placeholder="username field" 
                    type="text" value={userName} 
                    onChange={evt => setUserName(evt.target.value)} />
                    {/* <input required placeholder="password" 
                    type="password" value={password}  */}
                    {/* onChange={evt => setPassword(evt.target.value)}/> */}
                    <div className="buttonHolder">
                    <button type="submit" id="login" onClick={handleLogin}>Log in</button>
                    <button type="button" id="register" onClick={()=>{navigate("/register")}}>New User</button>
                    </div>
                </fieldset>
            </form>
            <h6>Oh wow, somebody put them in</h6>
        </section>
    </>)
}