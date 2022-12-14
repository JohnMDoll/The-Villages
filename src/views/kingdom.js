import { useEffect, useState } from "react"
import { HighScoresGetter, HighScoresRanker, GetUsers } from "../fetching/Fetching"
import "./kingdom.css"

export const TheKingdom = () => {
    document.body.id = "kingdom"
    if (window.location.path !== "game") { localStorage.removeItem("this_village") }//clearing saved data if user navigates away from /game

    const [highScores, setHighScores] = useState([])
    const [small, setSmall] = useState([])
    const [medium, setMedium] = useState([])
    const [large, setLarge] = useState([])
    const [scoreListed, setScoreListed] = useState([])
    const [display, setDisplay] = useState("")
    const [users, setUsers] = useState("")

    const scoreLister = () => {
        let smalls = highScores.filter((scores) => scores.village.gridLength === 10)
        setSmall(smalls)
        let mediums = highScores.filter((scores) => scores.village.gridLength === 20)
        setMedium(mediums)
        let larges = highScores.filter((scores) => scores.village.gridLength === 30)
        setLarge(larges)

        let scoreObjArrays = [smalls, mediums, larges]
        setScoreListed(scoreObjArrays)
    }

    const displayGenerator = (arrays) => {
        let stuff = arrays.map((oneSizeArray, i) => {
            return (
                <section className={`highscores--${oneSizeArray[0]?.village?.gridLength}`} key={`eachSize--${i}`}>
                    <div className="kingdom--header">Best {oneSizeArray[0]?.village?.gridLength * oneSizeArray[0]?.village?.gridLength} Block Villages</div>
                    <ul className="kingdom--list" key={`sizeList--${oneSizeArray.id}`}>
                        {
                            oneSizeArray.map((arr, i) => {
                                return (
                                    <li className="kingdom--item" key={`villageItem--${i}`}>
                                        <div key={`villageName--${i}`}><b>{arr.village?.villageName}</b></div>
                                        <div key={`generations--${i}`}>{arr.village?.maxGenerations} generations</div>
                                        <div key={`userName--${i}`}>lorded over by {(users.find(user => user.id === arr.village?.userId).userName)}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
            )
        })
        return setDisplay(stuff)
    }

    useEffect(
        () => {
            if (JSON.stringify(scoreListed) !== JSON.stringify([[], [], []]) && JSON.stringify(scoreListed) !== JSON.stringify([]) && JSON.stringify(small) !== JSON.stringify([])) {
                displayGenerator(scoreListed)
            } else {
            }
        }, [scoreListed]
    )

    useEffect(
        () => {
            const getHighScores = async () => {
                const result = await HighScoresGetter()
                const userList = await GetUsers()
                setHighScores(result)
                setUsers(userList)
            }
            getHighScores()
        }, []
    )

    useEffect(
        () => {
            if (highScores != []) {
                scoreLister()
            }
        }, [highScores]
    )

    return <>
        <div className="welcome">WELCOME TO THE KINGDOM</div>
        <section className="score--container">
            {
                display
            }
        </section>
    </>
}

