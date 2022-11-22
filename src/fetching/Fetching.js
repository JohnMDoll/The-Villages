//generic user fetching function? maybe useful, maybe not, but we'll try it in some places
export const getUsers = (query) => {
    if (!query) { let query = "" }
    return fetch(`https://localhost:8088/users?_${query}`)
        .then(console.log)
}
//site login process handler
export const HandleLogin = (userName, aPassword) => {
    return fetch(`http://localhost:8088/users?userName=${userName.toLowerCase()}&password=${aPassword}`)
        .then(res => res.json())
        .then(foundUsers => {
            if (foundUsers.length === 1) {
                const user = foundUsers[0]
                localStorage.setItem("cap_user", JSON.stringify({
                    id: user.id,
                    name: user.name,
                    admin: user.isAdmin
                }))
            }
            else {
                console.log("nuh uh")
                window.alert("Invalid login")
            }
        })
}

// Register.js for ensuring new account not registered with dupe user name
export const DuplicateUserNameCheck = (user) => {
    return fetch(`http://localhost:8088/users?userName=${user.userName.toLowerCase()}`)
        .then(res => res.json())
        .then(response => {
            if (response.length > 0) {
                // Duplicate userName. No good.
                window.alert("Account with that username already exists")
            }
            else {
                // Good userName, create user.
                RegisterNewUser(user)
            }
        })
}
// Register.js function to register a new user
export const RegisterNewUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem("cap_user", JSON.stringify({
                    id: createdUser.id,
                    name: createdUser.name,
                    staff: createdUser.isAdmin
                }))

            }
        })
}