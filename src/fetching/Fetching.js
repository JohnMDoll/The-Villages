import { useNavigate } from "react-router-dom"

//generic user fetching function? maybe useful, maybe not, but we'll try it in some places
const NavigateFunction = (words) => {
    let navigate=useNavigate(words)
    return navigate
}

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
    return fetch(`http://localhost:8088/villages/${villageObj.id}`,   {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        userId: villageObj.userId,
        maxGenerations: villageObj.maxGenerations,
        name: villageObj.name,
        gridLength: villageObj.gridLength,
        seed: villageObj.seed
    })
})
}

export const VillageSaver = (villageObj, seedObj) => {
    return fetch("http://localhost:8088/villages",   {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        userId: villageObj.userId,
        name: villageObj.name,
        gridLength: villageObj.gridLength,
        seed: seedObj
    })
})
    .then(res=> res.json())
    // .then(res => console.log(res))
    .then(res => [villageObj.id, villageObj.seed] = [res.id, res.seed])
}