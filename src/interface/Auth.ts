export interface Login{
    email: string;
    password: string;
}

export interface Register extends Login{
    first_name: string;
    last_name: string;
    phone_number: string;
}

export interface ForgotPassword{
    email: string;
}

export interface Refresh_Token{
    id: string;
}


export interface AuthRequst{
    Login: (data: Login) => any;
    Singup: (data:Register) => any;
    Reset: (data:ForgotPassword) => any;
    Logout: () => any;
    Refresh_Token: (data: Refresh_Token) => any;
}