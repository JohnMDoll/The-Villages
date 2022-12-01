import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DuplicateUserNameCheck } from "../fetching/Fetching"
import "./login.css"


export const Register = () => {
    const [userName, setUserName] = useState({userName: ""})
    // const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        DuplicateUserNameCheck(userName)
        .then(() => {return navigate("/")})
    }

    return (<>
        <section className="login">
            <h4>There's supposed to be some registration fields here</h4>
            <h5>Sucks to be you huh?</h5>
            <h6>Yeah it does.</h6>
            <form>
                <fieldset>
                    <input required autoFocus placeholder="username" 
                    type="text"
                    onChange={evt => setUserName({userName: evt.target.value})} />
                    <div className="buttonHolder">
                    <button type="submit" id="registerAndLogin" onClick={handleRegister}>Register and Log in</button>
                    </div>
                </fieldset>
            </form>
            <h6>Oh wow, somebody put them in</h6>
        </section>
    </>)
}