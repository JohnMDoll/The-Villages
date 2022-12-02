import { useEffect, useState } from "react"
import { GameRunning } from "./GameRunner"
// this module sets up the initial "game board" and tracks alive/dead cells. Maybe the alive/dead tracking gets moved to a different component later



export const CellFactory = ({ started, allCellReferences, setAllCellReferences, village, setVillage, gridLength, setGridLength }) => { //Intended to make an html cell with all the necessary unique attributes
    const [gridLength, setGridLength] = useState(10) //how big the playing grid will be (it's a square, so just need 1 dimension)

    const [village, setVillage] = useState({
        name: "",
        gridLength: gridLength,
        userId: (JSON.parse(localStorage.getItem("cap_user")).id)
    })

    const GridMaker = () => {
        return allCellReferences.map(cell => {
            return <div key={cell.address}
                onClick={(evt) => {
                    if (cell.status === true) {
                        cell.status = ("initialCell")
                        // console.log(`Initialized cells: ${allCellReferences.filter(cell => cell.status === "initialCell")}`)
                        // console.log(`Active cells: ${allCellReferences.filter(cell => cell.status === true)}`)
                        // console.log(`Dead cells: ${allCellReferences.filter(cell => cell.status === false)}`)
                    } else if (cell.status !== false) {
                        cell.status = (true)
                        // console.log(`Initialized cells: ${allCellReferences.filter(cell => cell.status === "initialCell")}`)
                        // console.log(`Active cells: ${allCellReferences.filter(cell => cell.status === true)}`)
                        // console.log(`Dead cells: ${allCellReferences.filter(cell => cell.status === false)}`)
                    } //do we even need to change the div to checked or unchecked now? That was initially intended to give an addressable attribute
                    return [
                        evt.target.checked = !evt.target.checked,
                        // console.log(evt), 
                        evt.target.className = cellClasser(cell.status)
                    ]
                }}
                className="initialCell" id={cell.address} value="">
                {cell.address}
            </div>
        })
    }

    const [grid, setGrid] = useState(GridMaker)

    useEffect(
        () => {
            let copy = { ...village }
            copy.gridLength = gridLength
            setVillage(copy)
            let allIds = [] //will hold unique grid element ids
            let i = 0 // i & j for row & column id/addresses assigned to each cell
            let j = 0
            while (i < gridLength) { //one loop to build each row's ids
                i++
                while (j < gridLength) { // another loop to build each column cell's id's within each row
                    j++
                    allIds.push(`${i}--${j}`)
                }
                j = 0
            }

            console.log(allIds)
            let CellReferences = allCellReferences //pulling prop into code
            CellReferences.splice(0, CellReferences.length)

            allIds.map(Id => {
                const thisCell = {}
                thisCell.address = Id
                thisCell.status = "initialCell"
                return CellReferences.push(thisCell)
            })
            setGrid(GridMaker())
        }, [gridLength]
    )

    const cellClasser = (status) => {
        let cellClass = ""
        if (status === true) {
            cellClass = "active"
        } else if (status === false) {
            cellClass = "dead"
        } else { cellClass = "initialCell" }
        return cellClass
    }


    // { if (started) return <GameRunning started={started} allCellReferences={allCellReferences} /> }
    return <>
        <section className="game--container">
            <div className="village--form">
                <label>Village Name:
                    <input required type="text" placeholder="Village Name" />
                </label>
                <label>Square Size:
                    <select onChange={(evt) => { return setGridLength(parseInt(evt.target.value)) }} defaultValue={0}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                    units
                </label>
            </div>
            <section className={`cells--grid--${gridLength}`}>
                {
                    grid
                }
            </section>
        </section>
    </>
}