// module contains all API functions

export const getUsers = (query) => {
    if (!query) { let query = "" }
    return fetch(`https://localhost:8088/users?_${query}`)
        .then(console.log)
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
            if (response.length > 0) {
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
                    // staff: createdUser?.isAdmin
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
            gridLength: villageObj.gridLength,
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

export const NameyChangey = () => {
    fetch("http://localhost:8088/villages?", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // userId: villageObj.userId,
            // villageName: villageObj.villageName,
            // gridLength: villageObj.gridLength,
            // seed: seedObj
        })
    })
        .then(res => res.json())
}

export const RazeTheVillage = (id) => {
    return fetch(`http://localhost:8088/villages/${id}`, {
        method: "DELETE"
    })
}

export const HighScoresDataGetter = () => {
    return fetch(`http://localhost:8088/villages`)
        //gotta sort out each village size and then reduce those down to 3-5 best of each then return that
}