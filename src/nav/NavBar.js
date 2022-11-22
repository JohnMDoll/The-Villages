import { useNavigate } from "react-router-dom"


export const NavBar = () => {
    const navigate = useNavigate()

    return <>
        <ul class="navbar">
            <li>
                <Link to="game" onClick={navigate("game")}>Game</Link>
            </li>
        </ul>
    </>
}