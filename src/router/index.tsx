import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Auth, Login, Register, ForgotPassword, Brand_Category, Protected, Protectedauth,Product_detail, Settings, Products, Models, Brands, Categories, Home, Single_Category} from "@pages";
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
                    <Route index element={<Home/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="products" element={<Products/>}/>
                    <Route path="models" element={<Models/>}/>
                    <Route path="brands" element={<Brands/>}/>
                    <Route path="categories" element={<Categories/>}/>
                    <Route path="categories/:subcategory" element={<Single_Category/>}/>
                    <Route path="brands/:brand" element={<Brand_Category/>}/>
                    <Route path="products/:detail" element={<Product_detail/>}/>
                </Route>
            </Route>
        )
    )
    return <RouterProvider router={root} />
}