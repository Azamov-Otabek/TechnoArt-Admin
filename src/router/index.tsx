import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Stock, Auth, Login, Register, ForgotPassword, Brand_Category, Protected , Protectedauth , Product_detail, Settings, Products, Brands, Categories, Home, Single_Category} from "@pages";
import Layout from '@layout'
import App from "../App";


export default function Router(){
    const root = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route path="/" element={<Protectedauth element={<Auth/>}/>}>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                </Route>
                <Route path="/dashboard/*" element={<Protected element={<Layout/>}/>}>
                    <Route index element={<Home/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="products" element={<Products/>}/>
                    <Route path="brands" element={<Brands/>}/>
                    <Route path="categories" element={<Categories/>}/>
                    <Route path="categories/:subcategory" element={<Single_Category/>}/>
                    <Route path="brands/:brand" element={<Brand_Category/>}/>
                    <Route path="products/:detail" element={<Product_detail/>}/>
                    <Route path="stock" element={<Stock/>}/>
                </Route>
            </Route>
        )
    )
    return <RouterProvider router={root} />
}