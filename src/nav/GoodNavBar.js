import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"

export const NavBar = () => {
    const navigate =  useNavigate()
    let user = JSON.parse(localStorage.getItem("cap_user"))
    
    return <>
        <section className="navbar">
            <div key="nav1" className="navdiv" id="user" onClick={() => { navigate("home") }}>
                {user.userName}'s Domain
            </div>
            <div key="nav2" className="navdiv" onClick={() => { navigate("/") }}>
                The Kingdom
            </div>
            <div key="nav3" className="navdiv" onClick={() => { navigate("game") }}>
                New Village
            </div>
            <div key="nav4" className="navdiv" onClick={() => { return [localStorage.removeItem("cap_user"), localStorage.removeItem("this_village"), navigate("login")] }}>
                Log Out
            </div>
        </section>
    </>
}