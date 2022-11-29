import { useEffect, useState } from "react"
import { CellFactory } from "./cellFactory" //creates the initial "board" and allows manual cell state setting
import { GameRunning } from "./GameRunner"
import "./gametest.css"

export const Game = () => {
    const [startOrStop, setStartOrStop] = useState(false) //we'll use this to track whether the game has been started yet, or stopped after starting
    const [activeCellArray, setActiveCellArray] = useState([])
    const [deadCellArray, setDeadCellArray] = useState([])
    const [gameSource, setGameSource] = useState(
        <CellFactory started={false}
            activeCellArray={activeCellArray}
            deadCellArray={deadCellArray} />
    )

    useEffect(
        () => {
            //needs a timeout somewhere in here for game watchability. I don't know how to do one well yet
            if (startOrStop === true) {
                setGameSource(<GameRunning
                    activeCellArray={activeCellArray}
                    deadCellArray={deadCellArray} />)
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
            <section className="cells--grid">
                {
                    gameSource
                }
            </section>
            <button onClick={startbutton}>start or stop</button>
        </article>
    </>
}
