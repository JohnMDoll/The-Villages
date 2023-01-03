import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { VillageUpdater } from "../fetching/Fetching"
import { GameRunning } from "./GameRunner"
// this module is responsible for initial manual "village" setup

export const CellFactory = ({ started, allCellReferences, cellReferenceSetterFunction, village, villageSetterFunction, gridLength, gridLengthSetterFunction }) => {
    const navigate = useNavigate()
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
            cellClass = `active--${GridLength}`
        } else if (status === false) {
            cellClass = `dead--${GridLength}`
        } else { cellClass = `initialCell--${GridLength}` }
        return cellClass
    }

    const GridMaker = () => { //creates the play area based on 
        if (existingVillage) {
            SetGridLength(existingVillage.gridLength)
            setVillageCopy(existingVillage)
            return existingVillage.seed.map((cell, i) => {
                return <div key={cell.address}
                    onClick={(evt) => {
                        if (cell.status === true) {
                            cell.status = (`initialCell--${GridLength}`)
                            existingVillage.seed[i].status = `initialCell--${GridLength}`
                            localStorage.setItem("this_village", JSON.stringify(existingVillage))
                            // console.log(`Initialized cells: ${allCellReferences.filter(cell => cell.status === "initialCell")}`)
                        } else if (cell.status !== false) {
                            cell.status = (true)
                            existingVillage.seed[i].status = (true)
                            localStorage.setItem("this_village", JSON.stringify(existingVillage))
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
                            cell.status = (`initialCell--${GridLength}`)

                        } else if (cell.status !== false) {
                            cell.status = (true)
                        } //do we even need to change the div to checked or unchecked now? That was initially intended to give an addressable attribute
                        return [
                            evt.target.checked = !evt.target.checked,
                            evt.target.className = cellClasser(cell.status)
                        ]
                    }}
                    className={`initialCell--${GridLength}`} id={cell.address} value="">
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
                cellReferenceSetterFunction(villageCopy.seed)
                villageSetterFunction(copy)
            }
            setGrid(GridMaker)
        }, [GridLength]
    )

    return <>
        <section className="game--container">
            <div className="words--container">
                <div className="village--form">
                    <label>Village Name:
                        <input required type="text"
                            defaultValue={existingVillage ? `${existingVillage.villageName}` : undefined} //set naming field to imported name if exists, otherwise placeholder displays
                            onChange={(evt) => {
                                let copy = { ...village }
                                copy.villageName = evt.target.value
                                if (existingVillage) {
                                    existingVillage.villageName = copy.villageName
                                    localStorage.setItem("this_village", JSON.stringify(existingVillage))
                                }
                                return [villageSetterFunction(copy), setVillageCopy(copy)]
                            }}
                            placeholder="Village Name" />
                        {existingVillage ? <button className="name--button" onClick={() => [VillageUpdater(villageCopy), navigate("../home"), window.location.reload()]}>Rename Only</button> : <></>}
                    </label>
                    <label>Square Size:
                        <select defaultValue={GridLength} onChange={(evt) => {
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
                <div className="village--form" id="explanation">
                    <div className="explanation--title">Rules of Village Life:</div>
                    <ol className="explanation">
                        <li className="explanation">
                            Click any block to direct Villagers to settle there, click again to remove them.
                        </li>
                        <li className="explanation">
                            Villagers with less than 2 and more than 3 neighbors will die in the next generation
                        </li>
                        <li className="explanation">
                            Blocks without life, and exactly 3 neighbors, will hold a Villager in the next generation
                        </li>
                        <li className="explanation">
                            After settling is complete and the Village is manifested, the Villagers will live their lives autonomously according to the rules.
                        </li>
                    </ol>
                </div>
            </div>
            <section className={`cells--grid--${GridLength}`}>
                {
                    grid
                }
            </section>
        </section>
    </>
}