import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Auth, Login, Register, ForgotPassword} from "@pages";
import Layout from '@layout'
import App from "../App";


export default function Router(){
    const root = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route path="/" element={<Auth/>}>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                </Route>
                <Route path="/dashboard/*" element={<Layout/>}>
                </Route>
            </Route>
        )
    )
    return <RouterProvider router={root} />
}