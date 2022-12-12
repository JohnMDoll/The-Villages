import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetUserVillages, RazeTheVillage } from "../fetching/Fetching"
import "./home.css"

//page users are directed to on login or after declining to make a new game
export const Home = () => {
    document.body.id = "home"
    localStorage.removeItem("this_village")
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("cap_user"))
    const [villageList, setVillageList] = useState([{ id: 6 }])
    const [old, setOldVillage] = useState({})
    const [newVillage, setNewVillage] = useState({})
    const [bussinVillage, setBussinVillage] = useState({})
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
                const bussinOne = villageList.reduce((a, b) => { return a.maxPopulation > b.maxPopulation ? a : b })
                setBussinVillage(bussinOne)
            }
        }, [villageList]
    )

    useEffect(
        () => {
            if (villageList[0]?.hasOwnProperty("userId")) {
                setVillageStats(
                    <>
                        <b>
                            <div className="home--stats" id="longest--village">
                                    {`Longest Living Village: `}
                                </div>
                                <div className="stat">
                                    {`The village of ${old.villageName}`}
                                </div>
                                <div className="stat">
                                    {`${old.maxGenerations} generations`}
                                </div>
                                <div className="stat">
                                    {`${old?.seed.length} block Village`}
                                </div>
                            <div className="home--stats" id="shortest--village">
                                    {`Shortest Living Village: `}
                                </div>
                                <div className="stat">
                                    {`The village of ${newVillage.villageName}`}
                                </div>
                                <div className="stat">
                                    {`${newVillage.maxGenerations} generations`}
                                </div>
                                <div className="stat">
                                    {`${newVillage?.seed?.length} block Village`}
                                </div>
                            <div className="home--stats">
                                    {`Most Bussin Village: `}
                                </div>
                                <div className="stat">
                                    {`The village of ${bussinVillage.villageName}`}
                                </div>
                                <div className="stat">
                                    {`${bussinVillage.maxGenerations} generations`}
                                </div>
                                <div className="stat">
                                    {`${bussinVillage?.seed?.length} block Village`}
                                </div>
                                
                        </b>
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
                    {<section className="except--welcome">
                        <div className="welcome">Welcome {user.userName}!</div>
                        <section className="home">
                            <div className="left--home">
                                <h3>Remarkable Villages:</h3>
                                {villageStats}
                            </div>
                            <div className="right--home">
                                <div className="village--list">
                                    <h3>Your Villages</h3>
                                    <i>Click any village to replay and/or edit it</i>
                                    <ul>
                                        {villageList.map((v, i) => {
                                            return <li key={v.id}
                                                onClick={(evt) => {
                                                    localStorage.setItem("this_village", JSON.stringify(villageList[i]))
                                                    navigate("../game")
                                                }}>
                                                <div key={v.id}>
                                                    <div>
                                                        {`Name: ${v.villageName}`}
                                                    </div>
                                                    <div>
                                                        {`${v.maxGenerations} Generations`}
                                                    </div>
                                                    <div>
                                                        {`${v.maxPopulation} Simultaneous Villagers`}
                                                    </div>
                                                    {`${v?.seed?.length} block Village`}
                                                </div>
                                                <button className="raze" onClick={(e) => {
                                                    e.stopPropagation()
                                                    alert(`${user.userName}'s might has been unleashed.\n\n The people wept, and no trace of "${v.villageName}" remained.`)
                                                    RazeTheVillage(v.id)
                                                    GetUserVillages(user.id, setVillageList)
                                                }
                                                }>
                                                    Raze {v.villageName}?
                                                </button>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </section>}
                </>
            )
        } else {
            return (
                <>
                    <h1>Welcome {user.userName}!</h1>
                    <h4>You don't have any villages yet.</h4>
                    <h2 onClick={() => navigate("/game")}>Click <i>here</i> to start</h2>
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