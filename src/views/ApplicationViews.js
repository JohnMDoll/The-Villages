import { Outlet, Route, Routes } from "react-router-dom/dist"
import { Game } from "../gametest/gametest"
import { Home } from "./home"

export const ApplicationViews = () => {
    if (window.location.path !=="game") {localStorage.removeItem("this_village")}//clearing saved data if user navigates away from /game

    return <Routes>
        <Route path="/" element={
            <>
                {/* <section className="applicationView">
                    <h1>Hi</h1>
                    <h3>We're Just Messing Around in Here</h3>
                    <h6>(this is in the ApplicationViews.js file, just fyi)</h6>
                </section> */}
                <Outlet />
            </>
        }>
            <Route path="game" element={<Game />}/>
            <Route path="home" element={<Home />}/>
            <Route />
        </Route>
    </Routes>
}