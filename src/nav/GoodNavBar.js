import { Link, useNavigate } from "react-router-dom"


export const NavBar = () => {
    const navigate = useNavigate()

    return <>
        <Link to="game" onClick={() => {
            navigate("employees", { replace: false })
        }}>Game</Link>
    </>

}