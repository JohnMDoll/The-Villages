import { useEffect, useState } from "react"
import { MaxGenPutter } from "../fetching/Fetching"
// this module is responsible for the running state of the game

export const GameRunning = ({ started, startedSetterFunction, allCellReferences, village, villageSetterFunction }) => { //Intended to make an html cell with all the necessary unique attributes
    let allCells = allCellReferences
    let gridLength = Math.sqrt(allCells.length)
    let [villageCopy, setVillageCopy] = useState(village)
    let [genCount, setGenCount] = useState(1) //tracks village generations
    let [previousPreviousGen, setPPGen] = useState([{ "status": "initial PPG" }])
    let [previousGen, setPGen] = useState([{ "status": "initial PG" }])

    const renderer = () => {
        return <>
            {
                allCellReferences.map(cell => {
                    return <div key={cell.address}
                        onClick={(evt) => {
                            console.log(`${cell.address} clicked on`)
                        }}
                        className={cell.status === true ? "active" : cell.status === false ? "dead" : "initialCell"} id={cell.address} value="">
                        {/* {cell.address} */}
                    </div>
                })
            }
        </>
    }

    const [display, setDisplay] = useState(renderer)

    allCellReferences.map((cell) => { //pull x/y coordinates for each cell for neighbor checking
        let [xCoord, yCoord] = cell.address.split("--")
        cell.xCoord = parseInt(xCoord)
        cell.yCoord = parseInt(yCoord)
    })

    const checkTheNeighborhood = (previousGen, previousPreviousGen) => {
        let cellsCopy = [...allCellReferences] //maintain cell state during neighbor calculations and update all at once after calcs finish
        //initialize neighbors count
        cellsCopy.map(cell => { cell.neighbors = 0 })
        //next ~35 lines check whether each cell's neighbors are active and gives the active neighbor count to the cell's .neighbor property
        cellsCopy.map(cell => {
            const neighborUL = allCellReferences.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord - 1) && neighborCell.yCoord === (cell.yCoord - 1)
            })
            const neighborML = allCellReferences.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord - 1) && neighborCell.yCoord === (cell.yCoord)
            })
            const neighborBL = allCellReferences.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord - 1) && neighborCell.yCoord === (cell.yCoord + 1)
            })
            const neighborBM = allCellReferences.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord) && neighborCell.yCoord === (cell.yCoord - 1)
            })
            const neighborUM = allCellReferences.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord) && neighborCell.yCoord === (cell.yCoord + 1)
            })
            const neighborBR = allCellReferences.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord + 1) && neighborCell.yCoord === (cell.yCoord - 1)
            })
            const neighborMR = allCellReferences.find(neighborCell => {
                return neighborCell.xCoord === (cell.xCoord + 1) && neighborCell.yCoord === (cell.yCoord)
            })
            const neighborUR = allCellReferences.find(neighborCell => {
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

        // setting up a check to see if a steady state has been reached, either all dead or just repetitive
        allCellReferences = cellsCopy.map((c => { return c }))
 
        allCellReferences.map(currentGenCell => {
            if (currentGenCell.status === true && currentGenCell.neighbors === 2 || currentGenCell.neighbors === 3) {
                currentGenCell.status = true
            } else if (currentGenCell.status === true && currentGenCell.neighbors < 2 || currentGenCell.neighbors > 3) {
                currentGenCell.status = false
            } else if (currentGenCell.neighbors === 3) {
                currentGenCell.status = true
            }
        })

        // console.log("allCellReferences updated, staleness check pending")
        // console.log(allCellReferences.map(a => a.status))
        // console.log(previousGen.map(a => a.status))
        // console.log(previousPreviousGen.map(a => a.status))

        // if previous or previous-previous generation is same as current, save genCount as maxGeneration in village object
        if (previousPreviousGen.length > 1 && previousGen.length > 1 && JSON.stringify(allCellReferences.map(a => a.status)) === JSON.stringify(previousGen.map(a => a.status)) || JSON.stringify(allCellReferences.map(a => a.status)) === JSON.stringify(previousPreviousGen.map(a => a.status))) {
            // console.log("stale confirmed")
            let copy = { ...village }
            if (!villageCopy.hasOwnProperty('maxGenerations')) {
                copy.maxGenerations = parseInt(Math.min(genCount))
                setVillageCopy(copy)
                villageSetterFunction(copy)
            
            }
        }
    //   console.log("stale check complete")
        
    }

    // useEffect written to stop endless recalculation at maximum processing speed
    useEffect(() => {
        if (!villageCopy.hasOwnProperty('maxGenerations')) {
            // console.log(allCells)
            const interval = setInterval(() => {
                checkTheNeighborhood(previousGen, previousPreviousGen)
                setDisplay(renderer)
                setGenCount(genCount++)
            }, 1000)
            return () => clearInterval(interval)
        } else {
            // console.log("it's dead Jim")
            MaxGenPutter(villageCopy)
            startedSetterFunction(false)
        }
    },
        [previousGen, previousPreviousGen]
    )
    //setting previous generations after each new generation to be compared for stagnation against the next gen
    useEffect(() => {
        setPPGen(structuredClone(previousGen))
        setPGen(structuredClone(allCellReferences))

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