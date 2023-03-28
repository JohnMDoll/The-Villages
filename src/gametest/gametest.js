import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { VillageSaver } from "../fetching/Fetching"
import { CellFactory } from "./cellFactory" //creates the initial "board" and allows manual cell state setting
import { GameRunning } from "./GameRunner"
import "./gametest.css"

export const Game = () => {
    document.body.id = "game"
    const navigate = useNavigate()
    const [startOrStop, setStartOrStop] = useState(false) //we'll use this to track whether the game has been started yet, or stopped after starting
    const [allCellReferences, setAllCellReferences] = useState([])
    const [gridLength, setGridLength] = useState(10) //how big the playing grid will be (it's a square, so just need 1 dimension)
    const existingVillage = JSON.parse(localStorage.getItem("this_village"))
    const [village, setVillage] = useState({
        name: "",
        gridLength: gridLength,
        userId: (JSON.parse(localStorage.getItem("cap_user")).id)
    })

    const [gameSource, setGameSource] = useState(
        <CellFactory
            started={startOrStop} //start button active
            village={village}
            villageSetterFunction={setVillage}
            gridLength={gridLength}
            gridLengthSetterFunction={setGridLength}
            allCellReferences={allCellReferences}
            cellReferenceSetterFunction={setAllCellReferences}
        /> //persisting active and dead cells across all game modules
    )

    useEffect(
        () => {
            //needs a timeout somewhere in here for game watchability. I don't know how to do one well yet
            if (startOrStop) {
                setGameSource(
                    <GameRunning key="runit"
                        started={startOrStop}
                        startedSetterFunction={setStartOrStop}
                        village={village}
                        villageSetterFunction={setVillage}
                        allCellReferences={allCellReferences}
                    />
                )
            } else if (startOrStop === false) {
                if (village.hasOwnProperty("maxGenerations")) {
                    localStorage.removeItem("this_village")
                    if (window.confirm("And they all lived, or didn't, in the same monotonous fashion, forever. The End.\nWould you like to create a new village?")) {
                        window.location.refresh()
                    } else { navigate("/home") }
                }
            }
        },
        [startOrStop]
    )

    const startbutton = (evt) => {
        evt.preventDefault()
        if (!village.hasOwnProperty("maxGenerations")) {
            VillageSaver(village, allCellReferences)
        }
        setStartOrStop(!startOrStop)
    }

    return <>
        <article className="village--supercontainer">
            <section className="village--name">
                <h1 className="village--name">{village.villageName}</h1>
            </section>
            {
                gameSource
            }
            {!startOrStop? <button className="startbutton" onClick={startbutton}>Manifest Village</button> : <></>}
        </article>
    </>
}
