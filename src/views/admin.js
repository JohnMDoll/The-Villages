import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { HighScoresGetter, HighScoresRanker, HighScoresUpdateNeededCheck } from "../fetching/Fetching"

//module for any adminnish things
export const Admin = () => {
    document.body.id = "admin"
    const user = JSON.parse(localStorage.getItem("cap_user"))
    const navigate = useNavigate()
    const [didAThing, setDidAThing] = useState(false)
    const [postedScores, setPosted] = useState()
    const [actualScores, setActual] = useState([])
    let old = []
    useEffect( //is snarky and kicks non-admin users out if they have the audacity to navigate to /admin
        () => {
            const adminCheck = () => {
                if (user.hasOwnProperty("admin") === false) {
                    window.alert("You don't belong here")
                    navigate("/")
                }
            }
            adminCheck()
        }, []
    )

    const oldScores = () => {
        let dbScores = HighScoresGetter()
        return dbScores
    }

    useEffect(
        () => {
            async function getSome() {
                const response = await HighScoresRanker()
                const otherResponse = await HighScoresGetter()
                setActual(response)
                setPosted(otherResponse)
                return response
            }
            let some = getSome()
        }, []
    )


    return (
        <>
            <h1>Admins only yo</h1>
            <div>{window.location.pathname}</div>
            <div></div>
        </>
    )
}