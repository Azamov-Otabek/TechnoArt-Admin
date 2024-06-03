import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../../utils/cocies"
import { element } from "@globalinter"

function index({element}: element) {
    return isAuthenticated()? <Navigate to="/dashboard"/> : element
}


export default index