import { useEffect, useState } from "react"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom/dist"
import { Game } from "../gametest/gametest"
import { Login } from "../login/Login"

export const ApplicationViews = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState()

    return <Routes>
        <Route path="/" element={
            <>
                <section className="applicationView">
                    <h1>Hi</h1>
                    <h3>We're Just Messing Around in Here</h3>
                    <h6>(this is in the ApplicationViews.js file, just fyi)</h6>
                </section>
                <Outlet />
            </>
        }>
            <Route path="game" element={<Game />}/>
            <Route />
        </Route>
    </Routes>
}