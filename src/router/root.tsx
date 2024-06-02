import { EditOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
export const auth_pages = [
    {
        title: "Login",
        path: "/",
        icon: <UserOutlined/>,
    },
    {
        title: "Register",
        path: "/register",
        icon: <EditOutlined/>,
    },
    {
        title: "Forgot Password",
        path: "/forgot-password",
        icon: <LockOutlined/>,
    }
]
