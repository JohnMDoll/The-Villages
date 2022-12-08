import { Outlet, Route, Routes } from "react-router-dom/dist"
import { Game } from "../gametest/gametest"
import { Home } from "./home"
import { TheKingdom } from "./kingdom"

export const ApplicationViews = () => {
    if (window.location.path !=="game") {localStorage.removeItem("this_village")}//clearing saved data if user navigates away from /game

    return <Routes>
        <Route path="/" element={
            <>
                <Outlet />
            </>
        }>
            <Route path="/" element={<TheKingdom />}/>
            <Route path="game" element={<Game />}/>
            <Route path="home" element={<Home />}/>
            <Route />
        </Route>
    </Routes>
}