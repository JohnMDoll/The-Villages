import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem("cap_user"))

    return <>
        <section className="navbar">
            <div className="navdiv" id="user" onClick={() => { navigate("/") }}>
                {user.userName}'s Domain
            </div>
            <div className="navdiv" onClick={() => { navigate("game", { replace: false }) }}>
                Game
            </div>
            <div className="navdiv" onClick={() => { return [localStorage.removeItem("cap_user"), navigate("login", { replace: false })] }}>
                Log Out
            </div>
        </section>
    </>

}