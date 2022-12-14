import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DuplicateUserNameCheck } from "../fetching/Fetching"
import "./login.css"


export const Register = () => {
    document.body.id = "login"
    const [userName, setUserName] = useState({ userName: "" })
    // const [password, setPassword] = useState("")

    const handleRegister = (e) => {
        e.preventDefault()
        DuplicateUserNameCheck(userName)
    }

    return (<>
        <section className="login" id="register">
            <div className="register--message">
                What do they call you?
            </div>
            <form>
                <fieldset>
                    <input className="login--input" id="register" required autoFocus placeholder="username"
                        type="text"
                        onChange={evt => setUserName({ userName: evt.target.value })} />
                    <div className="buttonHolder" id="register">
                        <button type="submit" id="register" onClick={userName.length? handleRegister : ""}
                        >Identify</button>
                    </div>
                </fieldset>
            </form>
        </section>
    </>)
}