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


export interface AuthRequst{
    Login: (data: Login) => any;
}