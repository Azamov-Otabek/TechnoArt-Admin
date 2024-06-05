export interface Login{
    phone_number: string;
    password: string;
}

export interface Register{
    first_name: string;
    last_name: string;
    email:string;
    password: string;
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
    Refresh_Token: (data: Refresh_Token) => any;
    getAdminbyId: (id: number) => any;
    deleteUser: (id: string) => any;
}