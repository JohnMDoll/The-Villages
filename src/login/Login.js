import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HandleLogin } from "../fetching/Fetching"
import "./login.css"


export const Login = () => {
    document.body.id = "login"
    localStorage.removeItem("cap_user")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        HandleLogin(userName)
        .then(() => {return navigate("/")})
    }

    return (<>
        <section className="login">
            <div className="declare">Declare Yourself and Enter the Kingdom!</div>
            <div className="login--register">If you have not been previously declared, click 'Register' to identify yourself, <u>immediately</u></div>
            <form>
                <fieldset>
                    <input className="login--input" required autoFocus placeholder="username" 
                    type="text" value={userName} 
                    onChange={evt => setUserName(evt.target.value)} />
                    <input required placeholder="password" 
                    type="password" value={password} 
                    onChange={evt => setPassword(evt.target.value)} />
                    <div className="buttonHolder">
                    <button type="submit" id="login" onClick={userName.length? handleLogin: ""}>Declare!</button>
                    <button type="button" id="register" onClick={()=>{navigate("/register")}}>Register</button>
                    </div>
                </fieldset>
            </form>
        </section>
    </>)
}