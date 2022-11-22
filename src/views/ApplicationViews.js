import { useEffect, useState } from "react"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom/dist"
import { Game } from "../gametest/gametest"
import { Login } from "../login/Login"

export const ApplicationViews = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState()

    // don't need now because Authorized module handles this?
    // useEffect(
    //     () => {
    //         if (!user) { setUser(localStorage.getItem("user")) ? navigate("/") : navigate("login") }
    //     },
    //     [user]
    // )

    return <Routes>
        <Route path="/" element={
            <>
                <section className="applicationView">
                    <h1>Hi</h1>
                    <h3>We're Just Messing Around in Here</h3>
                    <h6>(in the ApplicationViews file, just fyi)</h6>
                </section>
                <Outlet />
            </>
        }>
            <Route path="game" element={<Game />}/>
            <Route />
        </Route>
    </Routes>
}