import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HandleLogin } from "../fetching/Fetching"

export const Login = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        HandleLogin(userName,password)
        if (localStorage.getItem("cap_user")) {
            navigate("/")
        }
    }

    return (<>
        <section className="login">
            <h4>There's supposed to be some login fields here</h4>
            <h5>Sucks to be you huh?</h5>
            <h6>Yeah it does.</h6>
            <form>
                <fieldset>
                    <input required placeholder="username field" 
                    type="text" value={userName} 
                    onChange={evt => setUserName(evt.target.value)} />
                    <input required placeholder="password" 
                    type="password" value={password} 
                    onChange={evt => setPassword(evt.target.value)}/>
                    <button type="submit" onClick={handleLogin}>Log in</button>
                </fieldset>
            </form>
        </section>
    </>)
}