import { useEffect, useState } from "react"
import { VillageUpdater } from "../fetching/Fetching"
import { GameRunning } from "./GameRunner"
// this module is responsible for initial manual "village" setup

export const CellFactory = ({ started, allCellReferences, village, villageSetterFunction, gridLength, gridLengthSetterFunction }) => {
    const [GridLength, SetGridLength] = useState(gridLength) //how big the playing grid will be (it's a square, so just need 1 dimension)
    const [villageCopy, setVillageCopy] = useState(village)
    const existingVillage = JSON.parse(localStorage.getItem("this_village"))
    if (existingVillage) {
        village = existingVillage
        allCellReferences = existingVillage.seed
        if (GridLength !== existingVillage.gridLength) {
            SetGridLength(existingVillage.gridLength)
        }
    }

    const cellClasser = (status) => { //assigns initial/active/dead classNames to each cell based on status for styling
        let cellClass = ""
        if (status === true) {
            cellClass = "active"
        } else if (status === false) {
            cellClass = "dead"
        } else { cellClass = "initialCell" }
        return cellClass
    }

    const GridMaker = () => { //creates the play area based on 
        if (existingVillage) {
            setVillageCopy(existingVillage)
            return existingVillage.seed.map((cell, i) => {
                return <div key={cell.address}
                    onClick={(evt) => {
                        if (cell.status === true) {
                            cell.status = ("initialCell")
                            existingVillage.seed[i].status = "initialCell"
                            localStorage.setItem("this_village", JSON.stringify(existingVillage))
                            // console.log(`Initialized cells: ${allCellReferences.filter(cell => cell.status === "initialCell")}`)
                        } else if (cell.status !== false) {
                            cell.status = (true)
                            existingVillage.seed[i].status = (true)
                            localStorage.setItem("this_village", JSON.stringify(existingVillage))
                            // console.log(`Initialized cells: ${allCellReferences.filter(cell => cell.status === "initialCell")}`)
                        } //do we even need to change the div to checked or unchecked now? That was initially intended to give an addressable attribute
                        return [
                            evt.target.checked = !evt.target.checked,
                            // console.log(evt), 
                            evt.target.className = cellClasser(cell.status)
                        ]
                    }}
                    className={cellClasser(cell.status)} id={cell.address} value="">
                    {/* {cell.address} */}
                </div>
            })
        }
        else {
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
    }

    const [grid, setGrid] = useState(GridMaker)

    useEffect(
        () => {
            if (!existingVillage) { //shoehorning in data from an existing game if navigating from user's profile from village list click
                let copy = { ...villageCopy }
                copy.gridLength = GridLength
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
                let CellReferences = existingVillage ? existingVillage.seed : allCellReferences //copying prop into code
                CellReferences.splice(0, CellReferences.length)

                allIds.map(Id => {
                    const thisCell = {}
                    thisCell.address = Id
                    thisCell.status = "initialCell"
                    return CellReferences.push(thisCell)
                })
            } else { //only need to pass existing village data into village state if using saved village
                let copy = { ...villageCopy }
                villageSetterFunction(copy)
            }
            setGrid(GridMaker())
        }, [GridLength]
    )

    return <>
        <section className="game--container">
            <div className="village--form">
                <label>Village Name:
                    <input required type="text"
                        defaultValue={existingVillage ? `${existingVillage.villageName}` : undefined} //set naming field to imported name if exists, otherwise placeholder displays
                        onChange={(evt) => {
                            let copy = { ...village }
                            copy.villageName = evt.target.value
                            return [villageSetterFunction(copy), setVillageCopy(copy)]
                        }}
                        placeholder="Village Name" />
                    {existingVillage? <button onClick={() => VillageUpdater(villageCopy)}>Update Name</button> : <></>}
                </label>
                <label>Square Size:
                    <select onChange={(evt) => {
                        return [SetGridLength(parseInt(evt.target.value)),
                        gridLengthSetterFunction(parseInt(evt.target.value))]
                    }}
                    >
                        <option value={10}>100</option>
                        <option value={20}>400</option>
                        <option value={30}>900</option>
                    </select>
                    blocks
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