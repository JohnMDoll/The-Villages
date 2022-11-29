import { useState } from "react"
import { GameRunning } from "./GameRunner"
// this module sets up the initial "game board" and tracks alive/dead cells. Maybe the alive/dead tracking gets moved to a different component later

let i = 0 // i & j for row & column id/addresses assigned to each cell
let j = 0

export const CellFactory = ({ started, activeCellArray, deadCellArray }) => { //Intended to make an html cell with all the necessary unique attributes
    const [gridLength, setGridLength] = useState(10) //how big the playing grid will be (it's a square, so just need 1 dimension)

    let allIds = []

    while (i < gridLength) { //one loop to build each row's ids
        i++
        while (j < gridLength) { // another loop to build each column cell's id's within each row
            j++
            allIds.push(`${i}--${j}`)
        }
        j = 0
    }

    { if (started) return <GameRunning started={started} activeCellArray={activeCellArray} deadCellArray={deadCellArray} /> }
    return <>
        {
            allIds.map(cell => { deadCellArray.push(cell) //populate deadCellArray with all newly created cells, since they initially are inactive
                return <div key={cell}
                    onClick={(evt) => {
                        if (activeCellArray.includes(cell)) {
                            deadCellArray.push(cell)
                            let cellIndex = activeCellArray.indexOf(cell)
                            activeCellArray.splice(cellIndex, 1)
                            console.log(`Active cells: ${activeCellArray}`)
                            console.log(`Dead cells: ${deadCellArray}`)
                        } else if (deadCellArray.includes(cell)) {
                            activeCellArray.push(cell)
                            let cellIndex = deadCellArray.indexOf(cell)
                            deadCellArray.splice(cellIndex, 1)
                            console.log(`Active cells: ${activeCellArray}`)
                            console.log(`Dead cells: ${deadCellArray}`)
                        } //do we even need to change the div to checked or unchecked now? That was initially intended to give an addressable attribute
                        return [
                            evt.target.checked = !evt.target.checked,
                            // console.log(evt), 
                            evt.target.className = activeCellArray.includes(cell) ? "active" : "dead"
                        ]
                    }}
                    className="initialCell" id={cell} value="">
                    {cell}
                </div>
            })
        }
    </>
}