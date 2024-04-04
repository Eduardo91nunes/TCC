import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "../pages/Login";
import { Principal } from "../pages/Principal";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<Login/>}>
                <Route path="/Principal" element= {<Principal/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}