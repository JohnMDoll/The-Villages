import { useEffect, useState } from "react"
import { GameRunning } from "./GameRunner"
// this module is responsible for initial manual "village" setup

export const CellFactory = ({ started, allCellReferences, village, villageSetterFunction, gridLength, gridLengthSetterFunction }) => {

    const [GridLength, SetGridLength] = useState(gridLength) //how big the playing grid will be (it's a square, so just need 1 dimension)
    const [villageCopy, setVillageCopy] = useState(village)

    const GridMaker = () => {
        return allCellReferences.map(cell => {
            return <div key={cell.address}
                onClick={(evt) => {
                    if (cell.status === true) {
                        cell.status = ("initialCell")
                        // console.log(`Initialized cells: ${allCellReferences.filter(cell => cell.status === "initialCell")}`)
                    } else if (cell.status !== false) {
                        cell.status = (true)
                        // console.log(`Initialized cells: ${allCellReferences.filter(cell => cell.status === "initialCell")}`)
                    } //do we even need to change the div to checked or unchecked now? That was initially intended to give an addressable attribute
                    return [
                        evt.target.checked = !evt.target.checked,
                        // console.log(evt), 
                        evt.target.className = cellClasser(cell.status)
                    ]
                }}
                className="initialCell" id={cell.address} value="">
                {/* {cell.address} */}
            </div>
        })
    }

    const [grid, setGrid] = useState(GridMaker)

    useEffect(
        () => {
            let copy = { ...villageCopy }
            copy.gridLength = GridLength
            // setVillage(copy) //left from village being a local state only
            villageSetterFunction(copy)
            setVillageCopy(copy)
            let allIds = [] //will hold unique grid element ids
            let i = 0 // i & j for row & column id/addresses assigned to each cell
            let j = 0
            while (i < GridLength) { //one loop to build each row's ids
                i++
                while (j < GridLength) { // another loop to build each column cell's id's within each row
                    j++
                    allIds.push(`${i}--${j}`)
                }
                j = 0
            }

            // console.log(allIds)
            let CellReferences = allCellReferences //copying prop into code
            CellReferences.splice(0, CellReferences.length)

            allIds.map(Id => {
                const thisCell = {}
                thisCell.address = Id
                thisCell.status = "initialCell"
                return CellReferences.push(thisCell)
            })
            setGrid(GridMaker())
        }, [GridLength]
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
                    <input required type="text"
                        onChange={(evt) => {
                            let copy = { ...village }
                            copy.name = evt.target.value
                            return [villageSetterFunction(copy), setVillageCopy(copy)]
                        }}
                        placeholder="Village Name" />
                </label>
                <label>Square Size:
                    <select onChange={(evt) => {
                        return [SetGridLength(parseInt(evt.target.value)),
                        gridLengthSetterFunction(parseInt(evt.target.value))] 
                        }} 
                        >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                    units
                </label>
            </div>
            <section className={`cells--grid--${GridLength}`}>
                {
                    grid
                }
            </section>
        </section>
    </>
}