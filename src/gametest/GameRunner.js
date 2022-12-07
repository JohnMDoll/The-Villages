import { useEffect, useState } from "react"
import { MaxGenPutter } from "../fetching/Fetching"
// this module is responsible for the running state of the game

export const GameRunning = ({ started, startedSetterFunction, allCellReferences, village, villageSetterFunction }) => { //Intended to make an html cell with all the necessary unique attributes
    let [genCount, setGenCount] = useState(1) //tracks village generations
    let [previousPreviousGen, setPPGen] = useState([{ "status": "initial PPG" }])
    let [previousGen, setPGen] = useState([{ "status": "initial PG" }])
    let [villageCopy, setVillageCopy] = useState(village)
    let [allCellReference, setAllCellReference] = useState(allCellReferences)
    //do stuff to delete then set village/villageCopy again
    const existingVillage = JSON.parse(localStorage.getItem("this_village")) //find out if a village save is imported

    const maxGenClearer = () => {
        delete village.maxGenerations
        villageSetterFunction(village)
        setVillageCopy(village)
        setAllCellReference(existingVillage.seed)
    }

    useEffect(
        () => {
            if (existingVillage) {
               maxGenClearer()
            }
        }, []
    )

    let gridLength = Math.sqrt(allCellReference.length)

    const renderer = () => {
        console.log(`current gen 4-3: ${allCellReference[32]?.status}`)
        console.log(`prev gen 4-3: ${previousGen[32]?.status}`)
        console.log(`prepre gen 4-3: ${previousGen[32]?.status}`)
        return <>
            {
                allCellReference.map(cell => {
                    return <div key={cell.address}
                        onClick={(evt) => {
                            console.log(`${cell.address} clicked on`)
                        }}
                        className={cell.status === true ? "active" : cell.status === false ? "dead" : "initialCell"} id={cell.address} value="">
                        {cell.address}
                    </div>
                })
            }
        </>
    }

    const [display, setDisplay] = useState(renderer)

    allCellReference.map((cell) => { //pull x/y coordinates for each cell for neighbor checking
        let [xCoord, yCoord] = cell.address.split("--")
        cell.xCoord = parseInt(xCoord)
        cell.yCoord = parseInt(yCoord)
    })

    const checkTheNeighborhood = (previousGen, previousPreviousGen) => {
        let cellsCopy = [...allCellReference] //maintain cell state during neighbor calculations and update all at once after calcs finish

        //initialize neighbors count
        cellsCopy.map(cell => { cell.neighbors = 0 })
        //next ~35 lines check whether each cell's neighbors are active and gives the active neighbor count to the cell's .neighbor property
        cellsCopy.map(cell => {
            const neighborUL = allCellReference.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord - 1) && neighborCell.yCoord === (cell.yCoord - 1)
            })
            const neighborML = allCellReference.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord - 1) && neighborCell.yCoord === (cell.yCoord)
            })
            const neighborBL = allCellReference.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord - 1) && neighborCell.yCoord === (cell.yCoord + 1)
            })
            const neighborBM = allCellReference.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord) && neighborCell.yCoord === (cell.yCoord - 1)
            })
            const neighborUM = allCellReference.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord) && neighborCell.yCoord === (cell.yCoord + 1)
            })
            const neighborBR = allCellReference.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord + 1) && neighborCell.yCoord === (cell.yCoord - 1)
            })
            const neighborMR = allCellReference.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord + 1) && neighborCell.yCoord === (cell.yCoord)
            })
            const neighborUR = allCellReference.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord + 1) && neighborCell.yCoord === (cell.yCoord + 1)
            })
            //putting all of those found neighbors into this array and then adding count of alive ones to the current cell's neighbor count
            let neighborArray = [neighborBL, neighborBM, neighborBR, neighborML, neighborMR, neighborUL, neighborUM, neighborUR]

            neighborArray.map(each => {
                if (each?.status === true) {
                    cell.neighbors++
                } else {
                    cell.neighbors += 0
                }
            })
        })
       
        allCellReference = cellsCopy.map((c => { return c })) //updating with current neighbor count for next gen calculation
        allCellReference.map(currentGenCell => {
            if (currentGenCell.status === true && currentGenCell.neighbors === 2 || currentGenCell.neighbors === 3) {
                currentGenCell.status = true
            } else if (currentGenCell.status === true && currentGenCell.neighbors < 2 || currentGenCell.neighbors > 3) {
                currentGenCell.status = false
            } else if (currentGenCell.neighbors === 3) {
                currentGenCell.status = true
            }
        })
        // setting up a check to see if a steady state has been reached, either all dead or just repetitive
        // if previous or previous-previous generation is same as current, save genCount as maxGeneration in village object
        // console.log(previousPreviousGen)
        // console.log(previousGen)
        if (previousPreviousGen.length > 1 && previousGen.length > 1 && JSON.stringify(allCellReference.map(a => a.status)) === JSON.stringify(previousGen.map(a => a.status)) || JSON.stringify(allCellReference.map(a => a.status)) === JSON.stringify(previousPreviousGen.map(a => a.status))) {
            console.log("stale confirmed")
            let copy = { ...village }
            if (!villageCopy.hasOwnProperty('maxGenerations')) {
                copy.maxGenerations = parseInt(Math.min(genCount))
                setVillageCopy(copy)
                villageSetterFunction(copy)
            }
        }
    }

    // useEffect written to stop endless recalculation at maximum processing speed
    useEffect(() => {
        if (!villageCopy.hasOwnProperty('maxGenerations')) {

            const interval = setInterval(() => {
                checkTheNeighborhood(previousGen, previousPreviousGen)
                setDisplay(renderer)
                setGenCount(genCount++)
            }, 1000)
            return () => clearInterval(interval)
        } else {
            MaxGenPutter(villageCopy)
            startedSetterFunction(false)
        }
    },
        [previousGen, previousPreviousGen]
    )
    //setting previous generations after each new generation to be compared for stagnation against the next gen
    useEffect(() => {
        setPPGen(structuredClone(previousGen))
        setPGen(structuredClone(allCellReference))
    }, [genCount]
    )

    return <>
        <section className="game--container">
            <section className={`cells--grid--${gridLength}`}>
                {
                    display
                }
            </section>
            Generation Count: {genCount}
        </section>
    </>
}