import { AppleOutlined, BranchesOutlined, CopyOutlined, EditOutlined, HomeOutlined, LockOutlined, SettingOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
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

export const root = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <HomeOutlined/>,
    },
    {
        title: 'Categories',
        path: '/dashboard/categories',
        icon: <CopyOutlined />
    },
    {
        title: 'Products',
        path: '/dashboard/products',
        icon: <ShoppingOutlined />
    },
    {
        title: 'Brands',
        path: '/dashboard/brands',
        icon: <AppleOutlined />
    },
    {
        title: 'Models',
        path: '/dashboard/models',
        icon: <BranchesOutlined />
    },
    {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <SettingOutlined />
    }
]
