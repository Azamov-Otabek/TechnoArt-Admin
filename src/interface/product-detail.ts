export interface data_details{
    id: number,
    createdAt: string,
    lastUpdateAt: string,
    quantity: number
    images: string[],
    colors: string[],
    description: string,
    discount: number,
    product_id: number 
}

export interface post_details{
    quantity: number,
    colors: string,
    description: string,
    discount: number,
    product_id: number,
    files: any
}

export interface update_details{
    id: number,
    formData:any
}

export interface delete_details{
    id: number
}




export interface details_request{
    data_productDetail: data_details[],
    count: number,
    get_productDetail: () => any;
    post_productDetail: (data: any) => any;
    put_productDetail: (data: update_details) => any;
    delete_productDetail: (data: delete_details) => any;
}