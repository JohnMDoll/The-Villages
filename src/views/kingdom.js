import { useEffect, useState } from "react"
import { HighScoresGetter, HighScoresRanker } from "../fetching/Fetching"


export const TheKingdom = () => {
    if (window.location.path !== "game") { localStorage.removeItem("this_village") }//clearing saved data if user navigates away from /game

    const [highScores, setHighScores] = useState([])
    const [small, setSmall] = useState([])
    const [medium, setMedium] = useState([])
    const [large, setLarge] = useState([])
    const [scoreListed, setScoreListed] = useState([])
    const [display, setDisplay] = useState("")

    const scoreLister = () => {
        // HighScoresRanker()
        let smalls = highScores.filter((scores) => scores.village.gridLength === 10)
        setSmall(smalls)
        let mediums = highScores.filter((scores) => scores.village.gridLength === 20)
        setMedium(mediums)
        let larges = highScores.filter((scores) => scores.village.gridLength === 30)
        setLarge(larges)

        let scoreObjArrays = [smalls, mediums, larges]
        console.log("bout to setScoreListed")
        console.log("this is what scorelisted should be outputting:")
        console.log(scoreObjArrays)
        setScoreListed(scoreObjArrays)
    }

    const displayGenerator = (arrays) => {
        console.log("we're in displayGenerator!")
        let stuff = arrays.map((oneSizeArray,i) => { 
            return (
                
                    <section className={`highscores--${oneSizeArray[0]?.village?.gridLength}`} key={`eachSize--${i}`}>
                        <h2>Best {oneSizeArray[0]?.village?.gridLength * oneSizeArray[0]?.village?.gridLength} Block Villages</h2>
                        <ul key={`sizeList--${oneSizeArray.id}`}>
                            {
                                oneSizeArray.map((arr, i) => {
                                    return (
                                        <li key={`villageItem--${i}`}>
                                            <div key={`villageName--${i}`}><b>{arr.village?.villageName}</b></div>
                                            <div key={`generations--${i}`}>{arr.village?.maxGenerations} generations</div>
                                            <div key={`userName--${i}`}>by somebody with userId {arr.village?.userId}</div>
                                        </li>
                                    )
                                }
                                )
                            }
                        </ul>
                    </section>
                
            )
        }
        )
        return setDisplay(stuff)
    }

    useEffect(
        () => {
            if (JSON.stringify(scoreListed) !== JSON.stringify([[],[],[]]) && JSON.stringify(scoreListed) !== JSON.stringify([]) && JSON.stringify(small) !== JSON.stringify([])) {
                console.log("apparently scoreListed changed, let's see it:")
                console.log(scoreListed)
                displayGenerator(scoreListed)
                console.log("just ran displayGenerator")
            } else {
                console.log("didn't run displayGenerator, so let's look at scoreListed:")
                console.log(scoreListed)
            }
        }, [scoreListed]
    )

    useEffect(
        () => {
            const getHighScores = async () => {
                const result = await HighScoresGetter()
                setHighScores(result)
                console.log("got high score things from API, look at em:")
                console.log(result)
            }
            getHighScores()
        }, []
    )
    
    useEffect(
        () => {
            if (highScores != []) {
                scoreLister()
                console.log("maybe got high scores, gonna run scoreLister now")
            }
            else { console.log("don't have high scores, ain't running scoreLister yet") }
        }, [highScores]
    )

    return <>
        <div>this where "high scores" and such should be posted up</div>
        <section className="score--container">
            {
                display
            }
        </section>
    </>
}

