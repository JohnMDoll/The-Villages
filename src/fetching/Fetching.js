// module contains all API functions

export const GetUsers = () => {
    return fetch(`http://localhost:8088/users`)
        .then(res => res.json())
}

//site login process handler
export const HandleLogin = (userName) => {
    return fetch(`http://localhost:8088/users?userName=${userName}`)
        .then(res => res.json())
        .then(foundUsers => {
            if (foundUsers.length === 1) {
                const user = foundUsers[0]
                localStorage.setItem("cap_user", JSON.stringify({
                    id: user.id,
                    userName: user.userName,
                    admin: user?.isAdmin
                }))
            }
            else {
                console.log("nuh uh")
                window.alert("Invalid login")
            }
        })
}

// Register.js for ensuring new account not registered with dupe user name
export const DuplicateUserNameCheck = (userName) => {
    return fetch(`http://localhost:8088/users?userName=${userName.userName}`)
        .then(res => res.json())
        .then(response => {
            if (response) {
                // Duplicate userName. No good.
                window.alert("Account with that username already exists")
            }
            else {
                // Good userName, create user.
                RegisterNewUser(userName)
            }
        })
}
// Register.js function to register a new user
export const RegisterNewUser = (userName) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userName)
    })
        .then(res => res.json())
        .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem("cap_user", JSON.stringify({
                    id: createdUser.id,
                    userName: createdUser.userName,
                }))

            }
        })
}

export const MaxGenPutter = (villageObj) => {
    return fetch(`http://localhost:8088/villages/${villageObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: villageObj.userId,
            maxGenerations: villageObj.maxGenerations,
            villageName: villageObj.villageName,
            gridLength: villageObj.gridLength,
            seed: villageObj.seed,
            maxPopulation: villageObj.maxPopulation
        })
    })
}

export const VillageSaver = (villageObj, seedObj) => {
    return fetch("http://localhost:8088/villages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: villageObj.userId,
            villageName: villageObj.villageName,
            gridLength: Math.sqrt(seedObj.length),
            seed: seedObj
        })
    })
        .then(res => res.json())
        .then(res => [villageObj.id, villageObj.seed] = [res.id, res.seed])
}

export const VillageUpdater = (villageObj) => {
    return fetch(`http://localhost:8088/villages/${villageObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(villageObj)
    })
        .then(res => res.json())
}

export const GetUserVillages = (user, setterFunction) => {
    return fetch(`http://localhost:8088/villages?userId=${user}`)
        .then(res => res.json())
        .then(res => setterFunction(res))
}

export const RazeTheVillage = (id) => {
    return fetch(`http://localhost:8088/villages/${id}`, {
        method: "DELETE"
    })
}

export const HighScoresRanker = () => {
    return fetch(`http://localhost:8088/villages`)
        .then(res => res.json())
        .then(res => {
            let [allSmall, allMedium, allLarge] = [res.filter((vills) => vills.gridLength === 10), res.filter((vills) => vills.gridLength === 20), res.filter((vills) => vills.gridLength === 30)]
            let [small, medium, large] = [allSmall.sort((a, b) => b.maxGenerations - a.maxGenerations).slice(0, 5), allMedium.sort((a, b) => b.maxGenerations - a.maxGenerations).slice(0, 5), allLarge.sort((a, b) => b.maxGenerations - a.maxGenerations).slice(0, 5)]
            let topVills = [small, medium, large]
            console.log(topVills)
            return topVills
        })
}

const HighScoresReset = () => {
    return fetch(`http://localhost:8088/highScores`)
        .then(res => res.json())
        .then(res => res.map(each => fetch(`http://localhost:8088/highScores/${each.id}`, { method: "DELETE" })))
        .then(() => { return })
}

export const HighScoresPoster = (villageId, id) => {
    console.log(villageId, id)
    return fetch(`http://localhost:8088/highScores/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            villageId: villageId,
            id: id
        })
    }
    )
}


export const HighScoresGetter = () => {
    return fetch(`http://localhost:8088/highScores?_expand=village`)
        .then(res => res.json())
        .then((res) => { return res })
}

// const GetNames = (highList) => {

// }

