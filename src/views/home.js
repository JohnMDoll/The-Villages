import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetUserVillages, RazeTheVillage } from "../fetching/Fetching"

//page users are directed to on login or after declining to make a new game
export const Home = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("cap_user"))
    const [villageList, setVillageList] = useState([{ id: 6 }])
    const [old, setOldVillage] = useState({})
    const [newVillage, setNewVillage] = useState({})
    useEffect(
        () => {
            GetUserVillages(user.id, setVillageList)
        }, []
    )

    useEffect(
        () => {
            const oldOne = villageList.reduce((a, b) => { return a.maxGenerations > b.maxGenerations ? a : b })
            setOldVillage(oldOne)
            const newOne = villageList.reduce((a, b) => { return a.maxGenerations < b.maxGenerations ? a : b })
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
                            {`Longest Living Village: "${old?.villageName}" lasted ${old?.maxGenerations} generations in a ${old?.seed?.length} block Village Square`}
                        </div>
                        <div>
                            {`Shortest Living Village: "${newVillage?.villageName}" lasted ${newVillage?.maxGenerations} generations in a ${newVillage?.seed?.length} block Village Square`}
                        </div>
                    </div>
                    <div className="right--home">
                        <div className="village--list">
                            <h3>Your Villages</h3>
                            <ul>
                                {villageList.map((v, i) => {
                                    return <li key={v.id}
                                        onClick={(evt) => {
                                            localStorage.setItem("this_village", JSON.stringify( villageList[i] ))
                                            navigate("../game")
                                        }}>
                                        <div key={v.id}>
                                            <div>{`Name: ${v.villageName}`}</div>
                                            <div>{`${v.maxGenerations} Generations`}</div>
                                            {`${v?.seed?.length} block Village Square`}
                                        </div>
                                        <button className="raze" onClick={(e) => {
                                            e.stopPropagation()
                                            alert(`${user.userName}'s might has been unleashed.\n\n Despite countless pleas, no trace of "${v.villageName}" remains.`)
                                            {/*return RazeTheVillage(v.id)*/ }
                                            return console.log(v.id)
                                        }
                                        }>
                                            Raze {v.villageName}?
                                        </button>
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