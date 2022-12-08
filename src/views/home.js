import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetUserVillages, RazeTheVillage } from "../fetching/Fetching"

//page users are directed to on login or after declining to make a new game
export const Home = () => {
    localStorage.removeItem("this_village")
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("cap_user"))
    const [villageList, setVillageList] = useState([{ id: 6 }])
    const [old, setOldVillage] = useState({})
    const [newVillage, setNewVillage] = useState({})
    const [villageStats, setVillageStats] = useState()
    useEffect(
        () => {
            GetUserVillages(user.id, setVillageList)
        }, []
    )

    useEffect(
        () => {
            if (villageList[0]?.hasOwnProperty("userId")) {
                const oldOne = villageList.reduce((a, b) => { return a.maxGenerations > b.maxGenerations ? a : b })
                setOldVillage(oldOne)
                const newOne = villageList.reduce((a, b) => { return a.maxGenerations < b.maxGenerations ? a : b })
                setNewVillage(newOne)
            }
        }, [villageList]
    )

    useEffect(
        () => {
            if (villageList[0]?.hasOwnProperty("userId")) {
                setVillageStats(
                    <>
                        <div>
                            {`Longest Living Village: "${old.villageName}" lasted ${old.maxGenerations} generations in a ${old?.seed.length} block Village Square`}
                        </div>
                        <div>
                            {`Shortest Living Village: "${newVillage.villageName}" lasted ${newVillage.maxGenerations} generations in a ${newVillage?.seed?.length} block Village Square`}
                        </div>
                        <div>
                            <b>(Let's add a highest villager count stat to GameRunner and plunk that right in here)</b>
                        </div>
                    </>
                )
            }
        }, [old]
    )

    useEffect(
        () => {
            setDisplay(renderer)
        }, [villageList, villageStats]
    )

    const renderer = () => {
        if (villageList[0]?.hasOwnProperty("userId")) {
            return (
                <>
                    {<section className="home">
                        <div className="left--home">
                            <h1>Welcome {user.userName}!</h1>
                            <h3>Remarkable Villages:</h3>
                            {villageStats}
                        </div>
                        <div className="right--home">
                            <div className="village--list">
                                <h3>Your Villages</h3>
                                <i>Click any village to replay and/or modify</i>
                                <ul>
                                    {villageList.map((v, i) => {
                                        return <li key={v.id}
                                            onClick={(evt) => {
                                                localStorage.setItem("this_village", JSON.stringify(villageList[i]))
                                                navigate("../game")
                                            }}>
                                            <div key={v.id}>
                                                <div>{`Name: ${v.villageName}`}</div>
                                                <div>{`${v.maxGenerations} Generations`}</div>
                                                {`${v?.seed?.length} block Village Square`}
                                            </div>
                                            <button className="raze" onClick={(e) => {
                                                e.stopPropagation()
                                                alert(`${user.userName}'s might has been unleashed.\n\n The people wept, and no trace of "${v.villageName}" remains.`)
                                                RazeTheVillage(v.id)
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
        } else {
            return (
                <>
                    <h1>Welcome {user.userName}!</h1>
                    <h4>You don't have any villages yet.</h4>
                    <h2 onClick={()=>navigate("/game")}>Click <i>here</i> to start</h2>
                </>
            )
        }
    }

    const [display, setDisplay] = useState(renderer)

    return (
        <>
            {display}
        </>
    )
}