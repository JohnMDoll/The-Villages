import { useState } from "react"
import "./gametest.css"

export const Game = () => {
    let cellCount = 0 //for cumulative counting of cells for unique Id assignments
    let rowCount = 0 //vertical address counting
    let columnCount = 0 //horizontal address counting
    const [gridLength, setGridLength] = useState(5) //how big the playing grid will be (it's a square, so just need 1 dimension)
    let i = 0 // i & j for tracking row & column addresses assigned to each cell
    let j = 0

    const cellMaker = () => { //Intended to make an html cell with all the necessary unique attributes

        let oneCell = {}
        if (i < gridLength) { //one loop to build each row
            if (j < gridLength) { // another loop to build each column within each row
                oneCell.verticalLocationFromTop = rowCount++
                oneCell.horizontalLocationFromLeft = columnCount++
                j++
                console.log(i)
            }
            i++
        }
        return <div className="cell">{oneCell.verticalLocationFromTop}</div>

    }

    return <><section className="cells--grid">{cellMaker()}{cellMaker()}{cellMaker()}</section></>
    //make a function that computes what each cell's status is on next generation render
    // const NeighborChecker = () => {


    //     let aliveSilbings = 0;
    //     aliveSilbings += (x, y + 1) ? 1 : 0;
    //     aliveSilbings += (x + 1, y + 1) ? 1 : 0;
    //     aliveSilbings += (x + 1, y) ? 1 : 0;
    //     aliveSilbings += (x + 1, y - 1) ? 1 : 0;
    //     aliveSilbings += (x, y - 1) ? 1 : 0;
    //     aliveSilbings += (x - 1, y - 1) ? 1 : 0;
    //     aliveSilbings += (x - 1, y) ? 1 : 0;
    //     aliveSilbings += (x - 1, y + 1) ? 1 : 0;

    //     const isAlive = (x, y);

    //     // Cell live rules
    //     if (isAlive) {
    //         if (aliveSilbings >= 2 && aliveSilbings <= 3) return true;
    //     }
    //     else if (aliveSilbings === 3) return true;

    //     return false;
    // }
    // return <> {aliveSilbings}</>
}