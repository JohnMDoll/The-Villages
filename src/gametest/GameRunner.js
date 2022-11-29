import { useEffect, useState } from "react"
// this module is responsible for the running state of the game
let i = 0 // i & j for row & column id/addresses assigned to each cell
let j = 0

export const GameRunning = ({ cellArray }) => { //Intended to make an html cell with all the necessary unique attributes
    const [gridLength, setGridLength] = useState(10) //how big the playing grid will be (it's a square, so just need 1 dimension)
    let allIds = []
    let allCells = cellArray
    //on game start, repopulating allIds array with cell objects for rerendering in return statement?
    // activeCellArray.map(activeCell => {
    //     const thisCell = {}
    //     thisCell.address = activeCell
    //     thisCell.status = true
    //     return allIds.push(thisCell)
    // })
    // deadCellArray.map(deadCell => {
    //     const thisCell = {}
    //     thisCell.address = deadCell
    //     thisCell.status = false
    //     return allIds.push(thisCell)
    // })

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Got intervalled on')
        }, 10000)
        return () => clearInterval(interval)
    },
        []
    )
    
    /*leftover while for setting up initial layout from cellFactory.js copy
    // while (i < gridLength) { //one loop to build each row's ids
    //     i++
    //     while (j < gridLength) { // another loop to build each column cell's id's within each row
    //         j++
    //         allIds.push(`${i}--${j}`)
    //     }
    //     j = 0
     }*/

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
            allCells.map(cell => {
                return <div key={cell.address}
                    onLoad={(evt) => {
                        console.log(`${cell.address} onloaded`)
                        // if (activeCellArray.includes(cell)) {
                        //     deadCellArray.push(cell)
                        //     let cellIndex = activeCellArray.indexOf(cell)
                        //     activeCellArray.splice(cellIndex, 1)
                        //     console.log(`Active cells: ${activeCellArray}`)
                        //     console.log(`Dead cells: ${deadCellArray}`)
                        // } else {
                        //     activeCellArray.push(cell)
                        //     let cellIndex = deadCellArray.indexOf(cell)
                        //     deadCellArray.splice(cellIndex, 1)
                        //     console.log(`Active cells: ${activeCellArray}`)
                        //     console.log(`Dead cells: ${deadCellArray}`)
                        // } //do we even need to change the div to checked or unchecked now? That was initially intended to give an addressable attribute
                        // return [
                        //     evt.target.checked = !evt.target.checked,
                        //     // console.log(evt), 
                        //     evt.target.className = activeCellArray.includes(cell) ? "active" : "dead"
                        // ]
                    }}
                    className={cell.status ? "active" : "dead"} id={cell.address} value="">
                    {cell.address}
                </div>
            })
        }
    </>
}