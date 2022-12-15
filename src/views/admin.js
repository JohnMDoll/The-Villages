import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { HighScoresGetter, HighScoresPoster, HighScoresRanker, HighScoresUpdateNeededCheck } from "../fetching/Fetching"

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
                if (user.hasOwnProperty("admin") === false && window.location.pathname === "/admin") {
                    window.alert("You don't belong here")
                    navigate("/")
                }
            }
            adminCheck()
        }, []
    )

    useEffect(
        () => {
            async function getSome() {
                const response = await HighScoresRanker()
                const otherResponse = await HighScoresGetter()
                setActual(response)
                setPosted(otherResponse)
            }
            let some = getSome()
        }, []
    )

    useEffect(
        () => {
            let scoreMap = []
            let readyScores = []
            actualScores.length ? scoreMap = actualScores.flatMap(a => a) : console.log("no scores yet")
            scoreMap.length > 1 ? readyScores = scoreMap.map(each => each.id) : console.log(scoreMap.length)
            console.log(readyScores)
            readyScores.length>1? readyScores.forEach((score, i) => HighScoresPoster(score, (i+1)) ) : console.log("not ready to post scores yet")

        }, [actualScores]
    )


    return (
        <>
            <h1>Admins only yo</h1>
            <div>{window.location.pathname}</div>
            <div></div>
        </>
    )
}