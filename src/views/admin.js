import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HighScoresGetter, HighScoresRanker, HighScoresUpdateNeededCheck } from "../fetching/Fetching"

//module for any adminnish things
export const Admin = () => {
    document.body.id = "admin"
    const user = JSON.parse(localStorage.getItem("cap_user"))
    const navigate = useNavigate()    

    useEffect( //is snarky and kicks non-admin users out if they have the audacity to navigate to /admin
        () => {
            const adminCheck = () => {
                if (user.hasOwnProperty("admin") === false) {
                    window.alert("You don't belong here")
                    navigate("/")
                }
            }
            adminCheck()
        },[]
    )

    useEffect(
        () => {
            // HighScoresRanker()
            const HighScoresUpdateNeededCheck = () => {
                const dbScores = HighScoresGetter()
                const currentScores = HighScoresRanker()
                
            }
            HighScoresUpdateNeededCheck()
        },[]
    )

    return (
    <>
    <h1>Admins only yo</h1>
    <div>{window.location.pathname}</div>
    </>
    )
}