import { useEffect, useState } from "react"
// this module is responsible for the running state of the game
let i = 0 // i & j for row & column id/addresses assigned to each cell
let j = 0

export const GameRunning = ({ started, allCellReferences }) => { //Intended to make an html cell with all the necessary unique attributes
    let allCells = allCellReferences

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

        allCellReferences = cellsCopy

        allCellReferences.map(currentGenCell => {
            if (currentGenCell.status === true && currentGenCell.neighbors === 2 || currentGenCell.neighbors === 3) {
                currentGenCell.status = true
            } else if (currentGenCell.status === true && currentGenCell.neighbors < 2 || currentGenCell.neighbors > 3) {
                currentGenCell.status = false
            } else if (currentGenCell.neighbors === 3) {
                currentGenCell.status = true
            }
            console.log(currentGenCell.address)
            console.log(currentGenCell.status)
            console.log(currentGenCell.neighbors)
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkTheNeighborhood()
            rerendererer()
            // console.log(allCellReferences.filter(cell => cell.status === false))
            // console.log(allCellReferences.map(cell => [cell.address, cell.neighbors, cell.status]))
        }, 100000)
        return () => clearInterval(interval)
    },
        []
    )

    const rerendererer = () => {
        return <>
            {
                allCells.map(cell => {
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

    let render = rerendererer()
    return <>
        {
            render
        }
    </>
}