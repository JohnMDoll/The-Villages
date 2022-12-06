import { useEffect, useState } from "react"
import { GetUserVillages } from "../fetching/Fetching"

//page users are directed to on login or after declining to make a new game
export const Home = () => {
    const user = JSON.parse(localStorage.getItem("cap_user"))
    const [villageList, setVillageList] = useState([{ id: 6 }])
    const [old, setOldVillage] = useState({ villageName: "init", maxGenerations: 0 })
    const [newVillage, setNewVillage] = useState({ villageName: "init", maxGenerations: 0 })
    useEffect(
        () => {
            GetUserVillages(user.id, setVillageList)
        }, []
    )

    useEffect(
        () => {
            const oldOne = villageList?.reduce((a, b) => { return a.maxGenerations > b.maxGenerations ? a : b })
            setOldVillage(oldOne)
            const newOne = villageList?.reduce((a, b) => { return a.maxGenerations < b.maxGenerations ? a : b })
            setNewVillage(newOne)
        }, [villageList]
    )

    useEffect(
        () => {
            setDisplay(renderer)
        }, [villageList, old]
    )

    const renderer = () => {
        return (
            <>
                {<section className="home">
                    <div className="left--home">
                        <h1>Welcome {user.userName}!</h1>
                        <div>
                            {`Longest Living Village: "${old.villageName}" lasted ${old.maxGenerations} generations`}
                        </div>
                        <div>
                            {`Shortest Living Village: "${newVillage.villageName}" lasted ${newVillage.maxGenerations} generations`}
                        </div>
                    </div>
                    <div className="right--home">
                        <div className="village--list">
                            <h3>Your Villages</h3>
                            <ul>
                                {villageList.map(v => {
                                    return <li key={v.id}>
                                        {`Name: ${v.villageName}`}
                                        <div key={v.id}>{`${v.maxGenerations} Generations`}</div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </section>}
            </>
        )
    }

    const [display, setDisplay] = useState(renderer)

    return (
        <>
            {display}
        </>
    )
}