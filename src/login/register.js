import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DuplicateUserNameCheck } from "../fetching/Fetching"
import "./login.css"


export const Register = () => {
    document.body.id = "login"
    const navigate = useNavigate()
    const [userName, setUserName] = useState({ userName: "" })
    const [user, setUser] = useState()
    const [password, setPassword] = useState("")

    const handleRegister = (e) => {
        e.preventDefault()
        DuplicateUserNameCheck(userName)
        const user = JSON.parse(localStorage.getItem("cap_user"))
        if (user) { setUser(user) }
        navigate("/")
    }

    useEffect(
        () => {
            if (user?.hasOwnProperty("id")) { navigate("/") }
        }, [userName, user]
    )

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
                    <input required placeholder="password"
                        type="password" value={password}
                        onChange={evt => setPassword(evt.target.value)} />
                    <div className="buttonHolder" id="register">
                        <button type="submit" id="register" onClick={handleRegister}
                        >Identify</button>
                    </div>
                </fieldset>
            </form>
        </section>
    </>)
}