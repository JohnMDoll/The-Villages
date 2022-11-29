import { useState } from "react"
import {CellFactory} from "./cellFactory"
// this module is responsible for the running state of the game
let i = 0 // i & j for row & column id/addresses assigned to each cell
let j = 0

export const GameRunning = ({activeCellArray, deadCellArray}) => { //Intended to make an html cell with all the necessary unique attributes
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

    //make a function that computes what each cell's status is on next generation render
    // const NeighborChecker = () => {

    //     let aliveSiblings = 0;
    //     aliveSiblings += (x, y + 1) ? 1 : 0;
    //     aliveSiblings += (x + 1, y + 1) ? 1 : 0;
    //     aliveSiblings += (x + 1, y) ? 1 : 0;
    //     aliveSiblings += (x + 1, y - 1) ? 1 : 0;
    //     aliveSiblings += (x, y - 1) ? 1 : 0;
    //     aliveSiblings += (x - 1, y - 1) ? 1 : 0;
    //     aliveSiblings += (x - 1, y) ? 1 : 0;
    //     aliveSiblings += (x - 1, y + 1) ? 1 : 0;

    //     const isAlive = (x, y);

    //     // Cell live rules
    //     if (isAlive) {
    //         if (aliveSiblings >= 2 && aliveSiblings <= 3) return true;
    //     }
    //     else if (aliveSiblings === 3) return true;

    //     return false;
    // }
    // return <> {aliveSiblings}</>

    return <>
        {
            allIds.map(cell => {
                return <div key={cell}
                    onClick={(evt) => {
                        if (activeCellArray.includes(cell)) {
                            deadCellArray.push(cell)
                            let cellIndex = activeCellArray.indexOf(cell)
                            activeCellArray.splice(cellIndex, 1)
                            console.log(`Active cells: ${activeCellArray}`)
                            console.log(`Dead cells: ${deadCellArray}`)
                        } else {
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