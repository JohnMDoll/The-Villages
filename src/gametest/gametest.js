import { useEffect, useState } from "react"
import { CellFactory } from "./cellFactory" //creates the initial "board" and allows manual cell state setting
import { GameRunning } from "./GameRunner"
import "./gametest.css"

export const Game = () => {
    const [startOrStop, setStartOrStop] = useState(false) //we'll use this to track whether the game has been started yet, or stopped after starting
    const [allCellReferences, setAllCellReferences] = useState([])
    const [gameSource, setGameSource] = useState(
        <CellFactory 
            started={startOrStop} //start button active
            allCellReferences={allCellReferences} /> //persisting active and dead cells across all game modules
            
    )

    useEffect(
        () => {
            //needs a timeout somewhere in here for game watchability. I don't know how to do one well yet
            if (startOrStop) {
                setGameSource(<GameRunning
                    started={startOrStop}
                    allCellReferences={allCellReferences} />)
            } else if (startOrStop === false) {
                // setMyThoughts("just stop, but eventually we'll have to save the state to somewhere for resuming")
            }
        },
        [startOrStop]
    )

    const startbutton = (evt) => {
        evt.preventDefault()
        setStartOrStop(!startOrStop)
    }

    return <>
        <article>
                {
                    gameSource
                }
            <button onClick={startbutton}>start or stop</button>
        </article>
    </>
}
