import { useEffect, useState } from "react"
// this module is responsible for the running state of the game

export const GameRunning = ({ started, allCellReferences }) => { //Intended to make an html cell with all the necessary unique attributes
    let allCells = allCellReferences
    let gridLength = Math.sqrt(allCells.length)
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

    const checkTheNeighborhood = () => {
        let cellsCopy = [...allCellReferences] //maintain cell state during neighbor calculations and update all at once after calcs finish
        //initialize neighbors count
        cellsCopy.map(cell => { cell.neighbors = 0 })

        cellsCopy.map(cell => {
            // console.log(cell.xCoord)
            // console.log(cell.yCoord)
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
            // console.log(neighborArray)

            neighborArray.map(each => {
                if (each?.status === true) {
                    cell.neighbors++
                } else {
                    cell.neighbors += 0
                }
            })
        })
        let previousGeneration = [...allCellReferences]
        allCellReferences = cellsCopy

        allCellReferences.map(currentGenCell => {
            if (currentGenCell.status === true && currentGenCell.neighbors === 2 || currentGenCell.neighbors === 3) {
                currentGenCell.status = true
            } else if (currentGenCell.status === true && currentGenCell.neighbors < 2 || currentGenCell.neighbors > 3) {
                currentGenCell.status = false
            } else if (currentGenCell.neighbors === 3) {
                currentGenCell.status = true
            }
        })
    }
    // useEffect written to stop endless recalculation at maximum processing speed
    useEffect(() => {
        const interval = setInterval(() => {
            checkTheNeighborhood()
            setDisplay(renderer)
        }, 500)
        return () => clearInterval(interval)
    },
        [allCellReferences]
    )

    return <>
        <section className={`cells--grid--${gridLength}`}>
            {
                display
            }
        </section>
    </>
}