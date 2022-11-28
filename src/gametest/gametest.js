import { useState } from "react"
import "./gametest.css"

export const Game = () => {
    const [gridLength, setGridLength] = useState(10) //how big the playing grid will be (it's a square, so just need 1 dimension)
    // const 
    let i = 0 // i & j for row & column id/addresses assigned to each cell
    let j = 0

    const cellFactory = () => { //Intended to make an html cell with all the necessary unique attributes
        let allIds = []
        while (i < gridLength) { //one loop to build each row's ids
            i++
            while (j < gridLength) { // another loop to build each column cell's id's within each row
                j++
                allIds.push(`${i}--${j}`)
            }
            j = 0
        }
        console.log(allIds)
        let anArray = []
        return <>
            {
                allIds.map(cell => {
                    return <div key={cell}
                        onClick={(evt) => {
                            
                            if (anArray.includes(cell)){
                                let cellIndex = anArray.indexOf(cell)
                                anArray.splice(cellIndex, 1) 
                                console.log(anArray)
                            } else {
                                anArray.push(cell)
                                console.log(anArray)
                            }
                    return [evt.target.checked=!evt.target.checked, console.log(evt), evt.target.className=anArray.includes(cell)? "active":"dead"]}} className="initialCell"  id={cell} value="">{cell}</div>
    })
}
        </>
    }


return <>
    <section className="cells--grid">{
        cellFactory()
    }</section>
</>
}

// if < 2:
// .cell#`1--1`.checked = false
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
